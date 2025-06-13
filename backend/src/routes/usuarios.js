import express from 'express';
import {
  listarUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
} from '../controllers/usuariosController.js';

const router = express.Router();

// Ruta para obtener todos los usuarios (solo para pruebas o admin)
router.get('/', listarUsuarios);

// Ruta para obtener un usuario concreto por ID
router.get('/:id', obtenerUsuarioPorId);

// Ruta para crear un nuevo usuario manualmente (no se usa con Google, pero útil para otros casos)
router.post('/', crearUsuario);




export default router;

