import express from 'express';
import {
  listarRutas,
  crearRuta,
  agregarComentario,
  obtenerRutaPorId,
  actualizarRuta,
  eliminarRuta
} from '../controllers/rutasController.js';

const router = express.Router();

router.get('/', listarRutas);          
router.post('/', crearRuta);
router.get('/:id', obtenerRutaPorId);           
router.post('/:id/comentarios', agregarComentario);
router.patch('/:id', actualizarRuta);
router.delete('/:id', eliminarRuta);

export default router;
