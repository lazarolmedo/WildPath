
# 🌲 WildPath

Aplicación web para registrar, visualizar y explorar rutas de senderismo con autenticación Google, geolocalización en tiempo real y comentarios de usuarios.

## 📌 Descripción

**WildPath** es una SPA (Single Page Application) que permite a los usuarios:

- Autenticarse usando su cuenta de Google.
- Explorar rutas de senderismo mediante Google Maps.
- Grabar rutas personalizadas desde su dispositivo móvil.
- Comentar y consultar detalles de rutas.
- Visualizar y gestionar su perfil con estadísticas y logros.

---

## 🚀 Tecnologías

### Frontend
- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Bootstrap 5](https://getbootstrap.com/)
- [Google Maps API](https://developers.google.com/maps)
- Axios

### Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Mongoose](https://mongoosejs.com/)
- [Passport.js](http://www.passportjs.org/) con estrategia OAuth2 Google

---

## 📁 Estructura del Proyecto

```
WildPath/
├── frontend/
│   ├── src/
│   ├── public/
│   └── .env, package.json, vite.config.js...
├── backend/
│   ├── src/
│   ├── docs/
│   └── .env, package.json...
```

---

## ⚙️ Configuración Inicial

### Requisitos
- Node.js 18+
- Cuenta de Google para obtener credenciales OAuth2
- Clave de Google Maps API
- MongoDB Atlas configurado

### Variables de Entorno

#### Frontend (`frontend/.env`)
```env
VITE_GOOGLE_MAPS_API_KEY=TU_API_KEY
```

#### Backend (`backend/.env`)
```env
PORT=3000
MONGODB_URI=TU_URI_MONGODB
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

---

## 🖥️ Funcionalidades Principales

- Autenticación segura con Google OAuth2
- Visualización de rutas con mapa interactivo
- Grabación de rutas con geolocalización del usuario
- Sistema de comentarios y perfiles
- Diseño responsive con Bootstrap

---

## 📌 Scripts Útiles

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 📡 Endpoints API (resumen)

| Método | Ruta                          | Descripción                            |
|--------|-------------------------------|----------------------------------------|
| GET    | `/api/rutas`                  | Listar rutas                           |
| POST   | `/api/rutas`                  | Crear nueva ruta                       |
| GET    | `/api/rutas/:id`              | Obtener ruta por ID                    |
| POST   | `/api/rutas/:id/comentarios`  | Añadir comentario a ruta               |
| GET    | `/auth/google`                | Iniciar login con Google               |
| GET    | `/auth/logout`                | Cerrar sesión                          |
| GET    | `/auth/yo`                    | Obtener datos del usuario autenticado  |

---

## 🔗 Componentes Destacados

- `NavBar.vue`: barra de navegación global
- `RutaIndividualView.vue`: muestra mapa y comentarios de una ruta
- `GrabarRutaView.vue`: interfaz para grabar rutas desde el navegador
- `PerfilView.vue`: perfil del usuario autenticado

---

## 🧠 Buenas Prácticas

- Usa rutas RESTful claras y coherentes.
- Mantén separados los controladores, modelos y rutas en el backend.
- Aprovecha los componentes reutilizables de Vue en el frontend.
- Asegura las rutas que requieran sesión con Passport.

---

## 🧪 Próximos Pasos / Ideas

- Implementar sistema de logros por cantidad de rutas grabadas
- Añadir filtro de rutas por dificultad o ubicación
- Mejorar la experiencia móvil
- Agregar sistema de likes o favoritos

---

## 📄 Licencia

MIT License
