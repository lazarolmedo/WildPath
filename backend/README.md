#  WildPath Backend

Este es el backend de **WildPath**, una aplicación construida con **Node.js**, **Express**, y **MongoDB Atlas** utilizando **Mongoose** como ODM.  
Sirve como una API REST para crear, consultar y gestionar rutas almacenadas en la nube.

---

##  Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- ES Modules (import/export)
- Nodemon (dev)

---

##  Estructura de carpetas

```
wildpath-backend/
├── src/
│   ├── app.js               
│   ├── db.js                
│   ├── models/
│   │   ├── Ruta.js
│   │   └── Usuario.js          
│   ├── routes/
│   │   ├── rutasRoutes.js   
│   │   └── usuariosRoutes.js
│   └── controllers/
│       ├── rutasController.js
│       └── usuariosController.js
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

3. Crea el archivo `.env`:
```
PORT=3000
MONGO_URI=tu_url_de_conexion_a_mongo_atlas
```

4. Inicia el servidor:
```
node src/app.js
```

Servidor activo en: `http://localhost:3000`

---

## Uris REST disponibles 
(http://localhost:3000/api/rutas)


### 📍 RUTAS
Base URL: `http://localhost:3000/api/rutas`

- `GET /api/rutas`  
  Devuelve un listado completo de todas las rutas.

- `POST /api/rutas`  
  Crea una nueva ruta fija.  
  Requiere un JSON con `nombre`, `ubicacion`, `imagen`, `dificultad`, `recorrido`, etc.

- `GET /api/rutas/:id`  
  Devuelve los datos de una ruta en específico por su ID.
---
(http://localhost:3000/api/usuarios)

### 👤 USUARIOS
Base URL: `http://localhost:3000/api/usuarios`

- `GET /api/usuarios`  
  Devuelve un listado completo de todos los usuarios.

- `POST /api/usuarios`  
  Crea un nuevo usuario.  
  Requiere un JSON con `nombre`, `fotoPerfil`, `rutasCreadas`, `logros`, `estadisticas`.

- `GET /api/usuarios/:id`  
  Devuelve los datos de un usuario específico por su ID.

---
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


