import http from 'node:http';
import handler from '../api/portal.js';
http.createServer(handler).listen(3001, '127.0.0.1', () => console.log('API local disponible en http://127.0.0.1:3001'));
