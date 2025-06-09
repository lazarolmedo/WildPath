import express from 'express';
import {
  listarUsuarios,
  obtenerUsuarioPorId,
  crearUsuario
} from '../controllers/usuariosController.js';

const router = express.Router();

router.get('/', listarUsuarios);
router.get('/:id', obtenerUsuarioPorId);
router.post('/', crearUsuario);

export default router;
