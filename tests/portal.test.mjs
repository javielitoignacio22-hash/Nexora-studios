import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { makeHandler } from '../api/portal.js';

function provider() {
  const users = [{ id: 'admin-id', email: 'admin@test.local', password: 'Admin-test-12345', app_metadata: { role: 'admin' } }, { id: 'member-id', email: 'member@test.local', password: 'Member-test-12345', app_metadata: { role: 'user' }, user_metadata: { role: 'admin' } }];
  const sessions = []; let attempts = 0;
  const client = {
    rpc: async () => ({ data: ++attempts <= 10 }),
    auth: {
      signInWithPassword: async input => { const user = users.find(u => u.email === input.email && u.password === input.password); return user ? { data: { user } } : { data: {}, error: {} }; },
      signOut: async () => ({ error: null }),
      admin: {
        getUserById: async id => ({ data: { user: users.find(u => u.id === id) } }),
        listUsers: async () => ({ data: { users } }),
        createUser: async input => { if (users.some(u => u.email === input.email)) return { error: { status: 422 } }; const user = { ...input, id: `id-${users.length}` }; users.push(user); return { data: { user } }; }
      }
    },
    from: () => {
      let method, filter = () => true, value;
      const query = {
        delete() { method = 'delete'; return query; },
        select() { method = 'select'; return query; },
        insert(row) { method = 'insert'; value = row; return query; },
        eq(key, expected) { filter = row => row[key] === expected; return query; },
        lt(key, expected) { filter = row => row[key] < expected; return query; },
        maybeSingle: async () => ({ data: sessions.find(filter) || null }),
        then(resolve) {
          if (method === 'insert') sessions.push(value);
          if (method === 'delete') for (let i = sessions.length - 1; i >= 0; i--) if (filter(sessions[i])) sessions.splice(i, 1);
          return Promise.resolve({ data: null }).then(resolve);
        }
      }; return query;
    }
  };
  return { client, users, sessions, resetRate() { attempts = 0; } };
}
test('login, aislamiento de roles, creación de cuentas, expiración, CSRF y cierre real', async () => {
  const fake = provider(); let time = Date.now();
  const env = { SUPABASE_URL: 'https://example.supabase.co', SUPABASE_SERVICE_ROLE_KEY: 'test-secret', APP_ORIGIN: 'http://localhost:5173' };
  const server = http.createServer(makeHandler({ env, clientFactory: () => fake.client, clock: () => time }));
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}/api/portal?action=`;
  const post = (action, body, cookie = '', origin = env.APP_ORIGIN) => fetch(base + action, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', Cookie: cookie }, body: JSON.stringify(body) });
  const get = (action, cookie = '') => fetch(base + action, { headers: { Cookie: cookie } });
  const login = async email => { const response = await post('login', { email, password: email.startsWith('admin') ? 'Admin-test-12345' : 'Member-test-12345' }); assert.equal(response.status, 200); return response.headers.get('set-cookie').split(';')[0]; };
  try {
    assert.equal((await get('packs')).status, 401);
    assert.equal((await post('login', {}, '', 'https://foreign.local')).status, 403);
    assert.equal((await post('login', { email: 'member@test.local', password: 'wrong' })).status, 401);
    assert.equal((await post('login', { email: 'member@test.local', password: 'Member-test-12345', mode: 'admin' })).status, 403);
    const memberCookie = await login('member@test.local');
    assert.equal((await get('users', memberCookie)).status, 403);
    assert.equal((await post('users', { name: 'Injected', email: 'injected@test.local', password: 'Password-test-123', role: 'admin' }, memberCookie)).status, 403);
    const packs = await (await get('packs', memberCookie)).json();
    assert.deepEqual(packs.packs.map(p => [p.quantity,p.price]), [[5,15],[10,20],[20,40],[30,60]]);
    const adminCookie = await login('admin@test.local');
    assert.equal((await get('users', adminCookie)).status, 200);
    const created = await post('users', { name: 'Nuevo', email: 'new@test.local', password: 'Password-test-123', role: 'admin', app_metadata: { role: 'admin' } }, adminCookie);
    assert.equal(created.status, 201); assert.equal((await created.json()).user.role, 'user');
    assert.equal((await post('login', { email: 'new@test.local', password: 'Password-test-123' })).status, 200);
    assert.equal((await post('users', { name: 'Nuevo', email: 'new@test.local', password: 'Password-test-123' }, adminCookie)).status, 409);
    assert.equal((await post('logout', {}, memberCookie)).status, 200);
    assert.equal((await get('packs', memberCookie)).status, 401);
    fake.users[0].app_metadata.role = 'user';
    assert.equal((await get('users', adminCookie)).status, 403);
    time += 3600001; assert.equal((await get('packs', adminCookie)).status, 401);
    fake.resetRate();
    for (let i=0;i<10;i++) await post('login', { email:'member@test.local', password:'wrong' });
    assert.equal((await post('login', { email:'member@test.local', password:'Member-test-12345' })).status, 429);
  } finally { await new Promise(resolve => server.close(resolve)); }
});
test('sin configuración falla claramente y no permite acceso', async () => {
  const handler = makeHandler({ env: {} }); let body;
  const res = { setHeader() {}, end(value) { body = JSON.parse(value); } };
  await handler({ method: 'GET', url: '/api/portal?action=me', headers: {} }, res);
  assert.equal(res.statusCode, 503); assert.match(body.error, /Supabase/);
});
