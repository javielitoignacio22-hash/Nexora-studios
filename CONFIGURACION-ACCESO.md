# Nexora: activar las cuentas en Vercel

La interfaz React, el catálogo privado, la API de Vercel y la gestión de cuentas están implementados. Para que el acceso funcione en Internet debes conectar un proyecto Supabase. No hay credenciales universales ni modo de acceso ficticio.

## 1. Crear la base de datos

1. Crea un proyecto en https://supabase.com/dashboard usando tu cuenta. Conserva la contraseña de la base de datos en tu gestor de contraseñas.
2. En SQL Editor ejecuta el contenido de `supabase/setup.sql`. Las tablas de sesiones y límites de acceso solo tienen permisos para el servidor.
3. En Authentication, desactiva **Allow new users to sign up**. Mantén el proveedor de correo y contraseña habilitado. La administración crea las cuentas mediante la API administrativa, sin registro público.
4. Copia la URL del proyecto y su clave **secret** (`sb_secret_…`) o **service_role**. La clave de servidor nunca debe ir en React, Git, una variable `VITE_` ni un chat.

## 2. Configurar Vercel

En el proyecto existente, Settings → Environment Variables, añade:

| Variable | Valor |
| --- | --- |
| `SUPABASE_URL` | URL de tu proyecto Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave secret o service_role |
| `APP_ORIGIN` | URL HTTPS exacta de tu página, sin rutas, por ejemplo `https://tu-proyecto.vercel.app` |

Usa el dominio principal para `APP_ORIGIN`. Si cambias de dominio, actualiza la variable y vuelve a desplegar. Las URLs de vista previa identificadas por `VERCEL_URL` también se aceptan. No hay claves secretas en el paquete del navegador.

Vercel debe usar el preset Vite, `npm run build` y `dist`; el archivo `api/portal.js` se convierte en una función del servidor. Haz un nuevo despliegue después de configurar variables. Subir solo `dist` a un alojamiento estático no instala la API.

## 3. Crear el primer administrador

En la carpeta del proyecto, copia `.env.example` como `.env.local` y rellena las variables. Ejecuta con Node.js 22.12 o posterior:

```powershell
npm install
npm run crear-admin
```

El comando solicita nombre, correo y contraseña dos veces. Crea una cuenta nueva con el rol de administrador; no reemplaza cuentas existentes. Nunca se asigna el rol de administrador desde el formulario público ni desde datos enviados por un usuario.

Abre tu web, selecciona **Administrador** e inicia sesión. En **Cuentas** puedes crear usuarios con nombre, correo y contraseña. Entrega las credenciales al destinatario por tu canal acordado; la aplicación no envía mensajes ni emails automáticamente.

## 4. Probar localmente

En `.env.local`, usa `APP_ORIGIN=http://localhost:5173`. Abre dos terminales:

```powershell
npm run dev:api
```

```powershell
npm run dev
```

Abre `http://localhost:5173`. La API utiliza la misma base de datos configurada; para desarrollo conviene usar un proyecto de pruebas independiente. Sin variables o tablas aparecerá un error de configuración, no un rechazo falso de credenciales.

## Comportamiento

- Login por correo y contraseña; Supabase almacena y protege las contraseñas.
- Sesión opaca de una hora en cookie HttpOnly, SameSite=Strict y Secure en HTTPS. La base de datos almacena el hash del identificador. Cerrar sesión elimina el registro del servidor.
- Los permisos se vuelven a consultar en el servidor en cada petición. Ocultar la pestaña de administración no es la protección de seguridad.
- Diez intentos de login por IP durante una ventana de quince minutos; límite atómico persistente en Postgres.
- La API devuelve el catálogo solo a sesiones autenticadas. Los precios no constituyen información secreta: un usuario autorizado puede compartirlos.
- Packs: 5 / 15 USD, 10 / 20 USD, 20 / 40 USD, 30 / 60 USD. No se ha definido qué productos incluyen; se muestran como packs genéricos.
- WhatsApp usa `https://wa.me/18093835504` y abre un borrador de consulta. El usuario decide si lo envía.
- El aviso de cripto es informativo. No hay cartera, cobro automático ni procesamiento de pagos.

## Verificación

`npm test` comprueba autenticación, permisos, sesiones, límites y validación con un proveedor simulado. `npm run build` verifica la compilación React. La conexión real a Supabase y el despliegue requieren completar los pasos anteriores.

Referencias oficiales: https://supabase.com/docs/guides/auth/managing-user-data y https://vercel.com/docs/functions/runtimes/node-js
