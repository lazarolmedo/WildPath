- # API REST- WildPath Backend
	- ## URL base
    
        ```
                http://localhost:3000/api	
        ```

	- ## Recursos:
		- ## `rutas`
			- Las rutas de senderismo (tipo "fija") son el principal recurso manejado por la API. Se almacenan en una colección MongoDB llamada `rutas`.
			-
			- ## Representación de los datos (formato JSON)
				-
				  ```json
				          {
				            "_id": "665c2c6ff3d4a28245f5e7de",
				            "nombre": "Senda del Río Segura",
				            "ubicacion": "Calasparra, Murcia",
				            "imagen": "segura.jpg",
				            "tipo": "fija",
				            "recorrido": [
				              { "lat": 38.2411, "lng": -1.7005 },
				              { "lat": 38.2418, "lng": -1.6987 }
				            ]
				          }
				  ```
				-

		- ## Uris
			- ### `GET /api/rutas`
				- Devuelve un listado completo de todas las rutas disponibles.
				- - **Método**: `GET`
				- - **Headers requeridos**: ninguno
				- - **Parámetros**: ninguno
				- - **Cuerpo**:  no requiere
				- - **Respuestas**:
					- - `200 OK`
					- - `500 Internal Server Error`
				-

			- ### `POST /api/rutas`
				- - **Descripción**: Crea una nueva ruta fija en la base de datos.
				- - **Método**: `POST`
				- - **Headers requeridos**:
					- - `Content-Type: application/json`
				- - **Cuerpo requerido**: (ejemplo)
				-
				  ```json
				          {
				            "nombre": "Ruta de Ejemplo",
				            "ubicacion": "Ciudad, Región",
				            "imagen": "ejemplo.jpg",
				            "tipo": "fija",
				            "recorrido": [
				              { "lat": 38.1, "lng": -1.6 },
				              { "lat": 38.2, "lng": -1.5 }
				            ]
				          }
				  ```
				- - **Respuestas**:
					- - `201 Created`
					- - `400 Bad Request`
					- - `500 Internal Server Error`
				-

	- ## Ejemplos rápidos
		- ### Subir una ruta (`POST`)
			-
			  ```bash
			  curl -X POST http://localhost:3000/api/rutas \
			    -H "Content-Type: application/json" \
			    -d '{
			      "nombre": "Ruta Test",
			      "ubicacion": "Granada",
			      "imagen": "granada.jpg",
			      "tipo": "fija",
			      "recorrido": [
			        { "lat": 37.18, "lng": -3.60 }
			      ]
			    }'
			  ```
		- ### Ver rutas (`GET`)
			-
			  ```bash
			  curl http://localhost:3000/api/rutas
			  ```