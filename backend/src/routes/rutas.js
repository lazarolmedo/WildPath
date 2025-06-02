import express from 'express';
import { listarRutas, crearRuta } from '../controllers/rutasController.js';

const router = express.Router();

router.get('/', listarRutas);  // GET /api/rutas
router.post('/', crearRuta);   // POST /api/rutas

export default router;
