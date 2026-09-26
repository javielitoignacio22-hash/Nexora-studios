import { createClient } from '@supabase/supabase-js';
import { createHash, randomBytes } from 'node:crypto';

const hash = value => createHash('sha256').update(value).digest('hex');
const options = { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } };
const packs = [{ quantity: 5, price: 15 }, { quantity: 10, price: 20 }, { quantity: 20, price: 40 }, { quantity: 30, price: 60 }];
const publicUser = user => ({ id: user.id, email: user.email, name: user.user_metadata?.name || '', role: user.app_metadata?.role === 'admin' ? 'admin' : 'user' });
class PortalError extends Error { constructor(status, message) { super(message); this.status = status; } }
function check(result) { if (result.error) throw new PortalError(503, 'No se pudo acceder a la base de datos. Revisa la configuración del portal.'); return result.data; }
function credentials(body) {
  if (typeof body.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim()) || body.email.length > 254 || typeof body.password !== 'string' || body.password.length > 128 || !body.password.length) throw new PortalError(400, 'Introduce un correo y una contraseña válidos.');
  return { email: body.email.trim().toLowerCase(), password: body.password };
}

export function makeHandler({ env = process.env, clientFactory = createClient, clock = () => Date.now() } = {}) {
  return async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    const send = (status, body) => { res.statusCode = status; res.end(JSON.stringify(body)); };
    try {
      if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY || !env.APP_ORIGIN) throw new PortalError(503, 'El acceso todavía no está activado. Falta conectar Supabase en Vercel.');
      const origin = new URL(env.APP_ORIGIN).origin;
      const action = new URL(req.url, origin).searchParams.get('action');
      const allowedOrigins = new Set([origin]);
      if (env.VERCEL_URL) allowedOrigins.add(`https://${env.VERCEL_URL}`);
      if (!['GET', 'POST'].includes(req.method)) throw new PortalError(405, 'Método no permitido.');
      if (req.method === 'POST' && !allowedOrigins.has(req.headers.origin)) throw new PortalError(403, 'Solicitud de otro origen rechazada.');
      let body = {};
      if (req.method === 'POST') {
        if (!(req.headers['content-type'] || '').startsWith('application/json')) throw new PortalError(415, 'Se requiere JSON.');
        if (Number(req.headers['content-length'] || 0) > 8192) throw new PortalError(413, 'Solicitud demasiado grande.');
        if (req.body !== undefined) {
          if (Buffer.byteLength(typeof req.body === 'string' ? req.body : JSON.stringify(req.body)) > 8192) throw new PortalError(413, 'Solicitud demasiado grande.');
          body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        } else {
          const chunks = []; let length = 0;
          for await (const chunk of req) { length += chunk.length; if (length > 8192) throw new PortalError(413, 'Solicitud demasiado grande.'); chunks.push(chunk); }
          body = JSON.parse(Buffer.concat(chunks).toString() || '{}');
        }
        if (!body || typeof body !== 'object' || Array.isArray(body)) throw new PortalError(400, 'Solicitud inválida.');
      }
      const admin = clientFactory(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, options);
      const now = clock();
      const sid = /(?:^|;\s*)nexora_session=([a-f0-9]{64})(?:;|$)/.exec(req.headers.cookie || '')?.[1];
      const secure = origin.startsWith('https://') || Boolean(env.VERCEL);
      const cookie = value => `nexora_session=${value}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${value ? 3600 : 0}${secure ? '; Secure' : ''}`;
      if (action === 'login' && req.method === 'POST') {
        const login = credentials(body);
        const address = env.VERCEL ? String(req.headers['x-vercel-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim() : req.socket?.remoteAddress || 'local';
        const allowed = check(await admin.rpc('portal_allow_login', { identifier_input: hash(address) }));
        if (!allowed) { res.setHeader('Retry-After', '900'); throw new PortalError(429, 'Demasiados intentos. Inténtalo en 15 minutos.'); }
        // Un cliente independiente evita que el login sustituya la identidad del cliente administrador.
        const auth = clientFactory(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, options);
        const { data, error } = await auth.auth.signInWithPassword(login);
        if (error || !data.user) throw new PortalError(401, 'Correo o contraseña incorrectos. Solicita tu cuenta por WhatsApp.');
        try {
          const user = publicUser(data.user);
          if (body.mode === 'admin' && user.role !== 'admin') throw new PortalError(403, 'Esta cuenta no tiene permisos de administrador.');
          const token = randomBytes(32).toString('hex');
          check(await admin.from('portal_sessions').delete().lt('expires_at', new Date(now).toISOString()));
          if (sid) check(await admin.from('portal_sessions').delete().eq('token_hash', hash(sid)));
          check(await admin.from('portal_sessions').insert({ token_hash: hash(token), user_id: data.user.id, expires_at: new Date(now + 3600000).toISOString() }));
          res.setHeader('Set-Cookie', cookie(token));
          return send(200, { user });
        } finally { await auth.auth.signOut({ scope: 'local' }).catch(() => {}); }
      }
      if (action === 'logout' && req.method === 'POST') {
        if (sid) check(await admin.from('portal_sessions').delete().eq('token_hash', hash(sid)));
        res.setHeader('Set-Cookie', cookie(''));
        return send(200, { ok: true });
      }
      if (!sid) throw new PortalError(401, 'Inicia sesión para continuar.');
      const session = check(await admin.from('portal_sessions').select('user_id,expires_at').eq('token_hash', hash(sid)).maybeSingle());
      if (!session || new Date(session.expires_at).getTime() <= now) { res.setHeader('Set-Cookie', cookie('')); throw new PortalError(401, 'Tu sesión ha caducado. Vuelve a iniciar sesión.'); }
      const { data: account, error: accountError } = await admin.auth.admin.getUserById(session.user_id);
      if (accountError || !account.user || (account.user.banned_until && new Date(account.user.banned_until).getTime() > now)) throw new PortalError(401, 'Esta cuenta no tiene acceso.');
      const user = publicUser(account.user);
      if (action === 'me' && req.method === 'GET') return send(200, { user });
      if (action === 'packs' && req.method === 'GET') return send(200, { packs });
      if (action === 'users') {
        if (user.role !== 'admin') throw new PortalError(403, 'Solo el administrador puede gestionar cuentas.');
        if (req.method === 'GET') {
          const data = check(await admin.auth.admin.listUsers({ page: 1, perPage: 100 }));
          return send(200, { users: data.users.map(publicUser) });
        }
        const login = credentials(body);
        if (login.password.length < 12 || typeof body.name !== 'string' || !body.name.trim() || body.name.length > 80) throw new PortalError(400, 'Introduce un nombre y una contraseña de al menos 12 caracteres.');
        const { data, error } = await admin.auth.admin.createUser({ ...login, email_confirm: true, user_metadata: { name: body.name.trim() }, app_metadata: { role: 'user' } });
        if (error) throw new PortalError(error.status === 422 ? 409 : 400, 'No se pudo crear la cuenta. Comprueba si el correo ya existe o si la contraseña cumple los requisitos.');
        return send(201, { user: publicUser(data.user) });
      }
      throw new PortalError(404, 'Ruta no encontrada.');
    } catch (error) {
      return send(error instanceof SyntaxError ? 400 : error.status || 500, { error: error instanceof SyntaxError ? 'Solicitud inválida.' : error.status ? error.message : 'No se pudo completar la operación. Inténtalo de nuevo.' });
    }
  };
}
export default makeHandler();
