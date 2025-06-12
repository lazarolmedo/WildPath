import express from 'express';
import {
  listarUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  obtenerUsuarioActual,
  actualizarNombreUsuario
} from '../controllers/usuariosController.js';

const router = express.Router();

// Ruta para obtener todos los usuarios (solo para pruebas o admin)
router.get('/', listarUsuarios);

// Ruta especial para obtener el usuario autenticado mediante sesión
// Esta es la que se usa desde el frontend para saber si el usuario ha iniciado sesión con Google
router.get('/yo', obtenerUsuarioActual);

// Ruta para obtener un usuario concreto por ID
router.get('/:id', obtenerUsuarioPorId);

// Ruta para crear un nuevo usuario manualmente (no se usa con Google, pero útil para otros casos)
router.post('/', crearUsuario);

router.patch('/yo', actualizarNombreUsuario); 


export default router;

