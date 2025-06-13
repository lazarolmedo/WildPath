import express from 'express';
import { obtenerUsuarioActual, actualizarNombreUsuario } from '../controllers/usuariosController.js';

const router = express.Router();

// Obtener los datos del usuario autenticado
router.get('/yo', obtenerUsuarioActual);

// Editar solo el nombre del usuario autenticado
router.patch('/yo', actualizarNombreUsuario);

export default router;
