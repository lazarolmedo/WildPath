# WildPath Backend 

## URL base

```
http://localhost:3000
```

---

## Recursos

### rutas

* Las rutas de senderismo son el principal recurso manejado por la API.
* Se almacenan en la colección `rutas` de MongoDB Atlas.


### usuarios / rutas 

* Los usuarios representan a los participantes de la plataforma WildPath.
* 

* Se almacenan en la colección usuarios de MongoDB Atlas.
### RUTAS

- Las rutas de senderismo son el recurso principal gestionado por la API de WildPath.

- Cada ruta incluye información como ubicación, dificultad, altitud, duración estimada y un recorrido representado por coordenadas geográficas.

- Las rutas pueden enriquecerse con comentarios realizados por los usuarios.

- Se almacenan en la colección `rutas` de la base de datos MongoDB Atlas.

---

### Representación de los datos (formato JSON)
### RUTA

```json
{
  "nombre": "String",
  "ubicacion": "String",
  "imagen": "String",
  "descripcion": "String",
  "dificultad": {
    "type": "String", 
    "enum": ["baja", "media", "alta"]
  },
  "distanciaKm": 0,
  "duracionEstimada": 0,
  "altitud": 0,
  "travelMode": {
    "type": "String",
    "enum": ["walking", "biking"],
    "default": "walking"
  },
  "recorrido": [
    { "lat": 0, "lng": 0 }
  ],
  "comentarios": [
    {
      "usuarioId": "ObjectId",
      "texto": "String",
      "fecha": "Date"
    }
  ]
}

```

### USUARIO

```json
{
  "_id": "ObjectId",
  "nombre": "String",
  "fotoPerfil": "String",
  "googleId": "String",
  "email": "String",
  "rutasCreadas": ["ObjectId"],
  "logros": ["String"],
  "estadisticas": {
    "distanciaTotal": 0,
    "rutasCompletadas": 0
  }
}
```
---
---
## Uris

  ## Rutas

  ### GET /api/rutas

  Devuelve un listado completo de todas las rutas disponibles.

  * **Método**: `GET`
  * **Headers requeridos**: ninguno
  * **Parámetros**: ninguno
  * **Cuerpo**: no requerido
  * **Respuestas**:

    * `200 OK` - Lista de rutas
    * `500 Internal Server Error`

  ---

  ### POST /api/rutas

  * Crea una nueva ruta (fija) en la base de datos. Los comentarios son opcionales.

  * **Método**: `POST`

  * **Headers requeridos**:

    * `Content-Type: application/json`

  * **Cuerpo requerido (ejemplo)**:

  ```json
  {
    "nombre": "Ruta de Ejemplo",
    "ubicacion": "Ciudad, Región",
    "imagen": "ejemplo.jpg",
    "descripcion": "Una ruta muy bonita.",
    "dificultad": "baja",
    "distanciaKm": 5.4,
    "duracionEstimada": 2.0,
    "altitud": 300,
    "travelMode": "walking",
    "recorrido": [
      { "lat": 38.1, "lng": -1.6 },
      { "lat": 38.2, "lng": -1.5 }
    ],
    "comentarios": [
      {
        "usuarioId": "665a3dbecc5423fa98384a67",
        "texto": "Una experiencia genial.",
        "fecha": "2024-05-28T12:00:00Z"
      }
    ]
  }
  ```

  * **Respuestas**:

    * `201 Created` - Ruta creada exitosamente
    * `400 Bad Request` - Faltan campos o datos inválidos
    * `500 Internal Server Error` - Fallo al guardar
  ---
  
  ### GET /api/ruta/\:id

  Devuelve los datos de una ruta en específico por su ID.

  * **Método**: `GET`

  * **Headers requeridos**:

    * `Content-Type: application/json`
  
  * **Parámetros**: 
    `id (ID de la ruta)`
  * **Cuerpo requerido (ejemplo)**: Ninguno

  * **Respuestas**:

    * `200 Created` -  Ruta encontrado
    * `404 Not Found` - Ruta no encontrada
    * `500 Internal Server Error` - Error del servidor


  ---

  ### POST /api/rutas/\:id/comentarios

  Añade un nuevo comentario a una ruta ya existente.

  * **Método**: `POST`

  * **Headers requeridos**:

    * `Content-Type: application/json`

  * **Cuerpo requerido (ejemplo)**:

  ```json
  {
    "usuarioId": "665a3dbecc5423fa98384a67",
    "texto": "Una ruta espectacular y tranquila."
  }
  ```

  * **Respuestas**:

    * `201 Created` - Comentario añadido correctamente
    * `400 Bad Request` - Datos incompletos o inválidos
    * `404 Not Found` - Ruta no encontrada
    * `500 Internal Server Error` - Error del servidor


---*****
  ## Rutas
  
  ### GET /api/usuarios

    Devuelve un listado completo de todos los usuarios.

    * **Método**: `GET`
    * **Headers requeridos**: ninguno
    * **Parámetros**: ninguno
    * **Cuerpo**: no requerido
    * **Respuestas**:

      * `200 OK` - Lista de rutas
      * `500 Internal Server Error`

    ---

    ### POST /api/usuarios

    * Crea un nuevo usuario en la base de datos

    * **Método**: `POST`

    * **Headers requeridos**:

      * `Content-Type: application/json`

    * **Cuerpo requerido (ejemplo)**:

    ```json
      {
        "nombre": "Laura Senderista",
        "fotoPerfil": "laura.jpg",
        "googleId": "103829102938102938192", 
        "email": "laura@example.com",
        "rutasCreadas": [],
        "logros": ["Explorador"],
        "estadisticas": {
          "distanciaTotal": 0,
          "rutasCompletadas": 0
        }
      }
    ```

    * **Respuestas**:

      * `201 Created` - Usuario  creado exitosamente
      * `400 Bad Request` - Faltan campos o datos inválidos
      * `500 Internal Server Error` - Fallo al guardar

    ---

    ### GET /api/usuarios/\:id

    Devuelve los datos de un usuario específico por su ID.

    * **Método**: `POST`

    * **Headers requeridos**:

      * `Content-Type: application/json`
    
    * **Parámetros**: 
      `id (ID del usuario)`
    * **Cuerpo requerido (ejemplo)**: Ninguno

    * **Respuestas**:

      * `200 Created` -  Usuario encontrado
      * `404 Not Found` - Usuario no encontrada
      * `500 Internal Server Error` - Error del servidor


  ---

  ---
  ## Ejemplos rápidos

  ### Subir una ruta (`POST`)

  **URL**: `http://localhost:3000/api/rutas`

  **Body (JSON)**:

  ```json
  {
    "nombre": "Ruta Test",
    "ubicacion": "Granada",
    "imagen": "granada.jpg",
    "descripcion": "Ruta de prueba",
    "dificultad": "media",
    "distanciaKm": 6.3,
    "duracionEstimada": 2.5,
    "altitud": 410,
    "recorrido": [
      { "lat": 37.18, "lng": -3.60 },
      { "lat": 37.20, "lng": -3.61 }
    ]
  }
  ```

  ### Ver rutas (`GET`)

  **URL**: `http://localhost:3000/api/rutas`

  (No requiere cuerpo)

  ### Añadir un comentario (`POST`)

  **URL**: `http://localhost:3000/api/rutas/665f5b3fe3ad72a5d9a239d1/comentarios`

  **Body (JSON)**:

  ```json
  {
    "usuarioId": "665a3dbecc5423fa98384a67",
    "texto": "Una ruta muy bien señalizada"
  }
  ```
