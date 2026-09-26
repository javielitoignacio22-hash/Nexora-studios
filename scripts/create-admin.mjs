import { createClient } from '@supabase/supabase-js';
import readline from 'node:readline/promises';
import { Writable } from 'node:stream';

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) { console.error('Configura .env.local con la URL y la clave de servidor de Supabase.'); process.exit(1); }
let muted = false;
const output = new Writable({ write(chunk, encoding, callback) { if (!muted) process.stdout.write(chunk, encoding); callback(); } });
const rl = readline.createInterface({ input: process.stdin, output, terminal: true });
try {
  const name = (await rl.question('Nombre del administrador: ')).trim();
  const email = (await rl.question('Correo del administrador: ')).trim().toLowerCase();
  process.stdout.write('Contraseña (mínimo 12 caracteres; oculta): '); muted = true;
  const password = await rl.question(''); muted = false; process.stdout.write('\nRepite la contraseña: '); muted = true;
  const confirmation = await rl.question(''); muted = false; process.stdout.write('\n');
  if (!name || name.length > 80 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Nombre o correo inválido.');
  if (password.length < 12 || password.length > 128 || password !== confirmation) throw new Error('Las contraseñas deben coincidir y tener entre 12 y 128 caracteres.');
  const client = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  const { error } = await client.auth.admin.createUser({ email, password, email_confirm: true, app_metadata: { role: 'admin' }, user_metadata: { name } });
  if (error) throw new Error('No se pudo crear el administrador. Revisa la configuración y que el correo no esté registrado.');
  console.log('Administrador creado. Ya puedes iniciar sesión en la pestaña Administrador.');
} catch (error) { console.error(error.message); process.exitCode = 1; }
finally { muted = false; rl.close(); }
