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
│   │   └── Ruta.js          
│   ├── routes/
│   │   └── rutasRoutes.js   
│   └── controllers/
│       └── rutasController.js 
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

### `GET /api/rutas`
Devuelve un listado completo de todas las rutas.

### `POST /api/rutas`
Crea una nueva ruta fija.  
Requiere un JSON con `nombre`, `ubicacion`, `imagen`, `tipo` y `recorrido`.

Consulta la documentación completa en [`backend/docs/api_rest.md`](./docs/apirest.md)

---

## En desarrollo futuro
- Relación usuario-rutas
- Crear ruta usando ubicación en tiempo rea
- Añadir ams campos en los modelos de rutas y usuario
- Añadir el apartado de logros en los usuarioas 
---

## Autores
Creado y mantenido por el equipo de desarrollo de WildPath.

- **kleverDam** – Backend  
  GitHub: [@kleverDam](https://github.com/kleverDam)  
  Email: 5996913@alu.murciaeduca.es

- **lazarolmedo** – Frontend  
  GitHub: [@lazarolmedo](https://github.com/lazarolmedo)


