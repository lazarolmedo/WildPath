import dotenv from 'dotenv';
// Cargar las variables de entorno (incluye las claves de Google para login)
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';

import session from 'express-session';     // Requerido para mantener la sesión del usuario autenticado
import passport from 'passport';           // Librería para gestionar la autenticación
import './config/passport.js';             // Archivo donde configuramos Passport con Google OAuth

// Rutas
import authRoutes from './routes/auth.js'; // Rutas relacionadas con login con Google
import rutasRoutes from './routes/rutas.js';
import usuariosRoutes from './routes/usuarios.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // Necesario para permitir el envío de cookies entre front y back (login con sesión)
}));

app.use(helmet());

// Conexión con la base de datos MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error de conexión:', err));

// Configuración de sesión (requerida por Passport)
// Esta sesión se almacena en el navegador del usuario con una cookie
app.use(session({
  secret: 'clave-secreta-wildpath', // Clave para firmar la cookie (puede estar en .env en producción)
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // secure debe ser true si usamos HTTPS (en producción)
}));

// Inicializamos Passport y le indicamos que use las sesiones creadas arriba
app.use(passport.initialize());
app.use(passport.session()); // Esto vincula la sesión con Passport para que pueda recordar al usuario autenticado

// Rutas del backend
app.use('/api/rutas', rutasRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/auth', authRoutes); // Ruta que contiene la lógica para iniciar sesión con Google

// Arranque del servidor
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
