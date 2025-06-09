import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

import rutasRoutes from './routes/rutas.js';
import usuariosRoutes from './routes/usuarios.js';
// Cargar variables del .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(express.json());
app.use(cors());
app.use(helmet());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(' Conectado a MongoDB Atlas'))
  .catch(err => console.error(' Error de conexión:', err));

// Rutas API
app.use('/api/rutas', rutasRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(` Servidor activo en http://localhost:${PORT}`);
});
