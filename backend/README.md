#  WildPath Backend

Este es el backend de **WildPath**, una aplicación construida con **Node.js**, **Express**, y **MongoDB Atlas** utilizando **Mongoose** como ODM.  
Sirve como una API REST para crear, consultar y gestionar rutas almacenadas en la nube.

---

##  Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB Atlas + Mongoose
- Autenticación con **Passport.js** y **OAuth2 de Google**
- Configuración segura mediante **dotenv**

---

##  Estructura de carpetas

```
wildpath-backend/
├── src/
│   ├── app.js               
│   ├── config/
│   │   └── passport.js    
│   ├── controllers/
│   │   ├── rutasController.js     
│   │   └── usuariosController.js  
│   ├── models/
│   │   ├── Ruta.js        
│   │   └── Usuario.js    
│   └── routes/
│       ├── auth.js      
│       ├── rutas.js      
│       └── usuarios.js    
│
├── .env
├── .gitignore
├── package.json
```

---

##  Configuración del entorno

1. Instala las dependencias:
```
npm install
```

3. Crea el archivo `.env` en la raíz del proyecto con el siguiente contenido:
```
    PORT=3000
    MONGODB_URI=tu_url_de_conexion_a_mongo
    GOOGLE_CLIENT_ID=tu_client_id_de_google
    GOOGLE_CLIENT_SECRET=tu_secreto_de_google
    GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
    VITE_GOOGLE_MAPS_API_KEY=tu_clave_de_maps

```

4. Inicia el servidor:
```
node src/app.js
```

Servidor activo en: `http://localhost:3000`

---

## Uris REST disponibles 
(http://localhost:3000/api/rutas)


### RUTAS
Base URL: `http://localhost:3000/api/rutas`

- `GET /api/rutas`  
  Devuelve un listado completo de todas las rutas.

- `POST /api/rutas`  
  Crea una nueva ruta fija. 
- `GET /api/rutas/:id`  
  Devuelve los datos de una ruta en específico por su ID.
- `POST /api/rutas/:id/comentarios`
  Añade un comentario a una ruta individual
---
(http://localhost:3000/api/usuarios)

### USUARIOS
Base URL: `http://localhost:3000/api/usuarios`

- `GET /api/usuarios`  
  Devuelve un listado completo de todos los usuarios.

- `POST /api/usuarios`  
  Crea un nuevo usuario.  
  Requiere un JSON con `nombre`, `fotoPerfil`, `rutasCreadas`, `logros`, `estadisticas`.

- `GET /api/usuarios/:id`  
  Devuelve los datos de un usuario específico por su ID.
  
---

Consulta la documentación completa en [`backend/docs/api_rest.md`](./docs/apirest.md)

---
---


## Autores
Creado y mantenido por el equipo de desarrollo de WildPath.

- **kleverDam** – Backend  
  GitHub: [@kleverDam](https://github.com/kleverDam)  
  Email: 5996913@alu.murciaeduca.es

- **lazarolmedo** – Frontend  
  GitHub: [@lazarolmedo](https://github.com/lazarolmedo)


