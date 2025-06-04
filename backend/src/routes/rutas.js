import express from 'express';
import {
  listarRutas,
  crearRuta,
  agregarComentario,
  obtenerRutaPorId
} from '../controllers/rutasController.js';

const router = express.Router();

router.get('/', listarRutas);          
router.post('/', crearRuta);
router.get('/:id', obtenerRutaPorId);           
router.post('/:id/comentarios', agregarComentario);

export default router;
