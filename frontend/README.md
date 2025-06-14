## Recommended IDE Setup
---

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).
## Tecnologías y dependencias
- Vue 3
- Vite
- Vue Router
- Axios
- Bootstrap 5 + Bootstrap Icons
- Google Maps API

## Customize configuration
---

See [Vite Configuration Reference](https://vite.dev/config/).
## Estructura de carpetas
```text
wildpath-frontend/
├── public/          # Imágenes e iconos
├── src/
│   ├── assets/      # Estilos globales
│   ├── components/  # Componentes reutilizables
│   ├── router/      # Configuración de rutas
│   ├── views/       # Vistas principales
│   └── main.js      # Punto de entrada
├── package.json
└── vite.config.js
```

## Project Setup
---

```sh
## Configuración del entorno
1. Instala las dependencias:
```bash
npm install
```

### Compile and Hot-Reload for Development

```sh
2. Crea un archivo `.env` en este directorio con tu clave de Google Maps:
```bash
VITE_GOOGLE_MAPS_API_KEY=tu_clave_de_maps
```
3. Inicia el servidor de desarrollo:
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173` por defecto.

### Compile and Minify for Production

```sh
### Compilar para producción
```bash
npm run build
```
Los archivos listos para desplegar quedarán en `dist/`.

### Lint with [ESLint](https://eslint.org/)

```sh
### Lint y formato
```bash
npm run lint
npm run format
```

---

## Funcionalidades
- Listado y búsqueda de rutas con paginación.
- Grabación de nuevas rutas utilizando geolocalización.
- Visualización de rutas individuales en un mapa con indicaciones.
- Gestión de usuario: perfil, logros y cierre de sesión.
- Comentarios en cada ruta.

---

## Autores
- **lazarolmedo** – Frontend ([GitHub](https://github.com/lazarolmedo))
- **kleverDam** – Backend ([GitHub](https://github.com/kleverDam))