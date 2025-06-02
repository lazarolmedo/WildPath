# API REST - WildPath Backend (Actualizado)

## URL base

```
http://localhost:3000/api
```

---

## Recursos

### rutas

* Las rutas de senderismo son el principal recurso manejado por la API.
* Se almacenan en la colección `rutas` de MongoDB Atlas.

* Ahora permiten comentarios opcionales, que pueden añadirse más tarde.

---

### Representación de los datos (formato JSON)

```json
{
  nombre: String,                  
  ubicacion: String,              
  imagen: String,                 
  descripcion: String,           
  dificultad: {
    type: String,                // 'baja' | 'media' | 'alta'
    enum: ['baja', 'media', 'alta']
  },
  distanciaKm: Number,           
  duracionEstimada: Number,     
  altitud: Number,              
  recorrido: [                  
    {
      lat: Number,              
      lng: Number               
    }
  ],
  comentarios: [                 
    {
      usuarioId: ObjectId,       
      texto: String,             
      fecha: Date                
    }
  ]
}
```

---

## Uris

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

* **Descripción**: Crea una nueva ruta (fija) en la base de datos. Los comentarios son opcionales.

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
