import express from 'express';
import {
  listarRutas,
  crearRuta,
  agregarComentario
} from '../controllers/rutasController.js';

const router = express.Router();

router.get('/', listarRutas);          
router.post('/', crearRuta);           
router.post('/:id/comentarios', agregarComentario);

export default router;
