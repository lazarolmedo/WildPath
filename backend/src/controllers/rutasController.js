
import Ruta from '../models/Ruta.js';

// GET /api/rutas
export async function listarRutas(req, res) {
  try {
    const rutas = await Ruta.find();
    res.status(200).json(rutas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las rutas' });
  }
}

// POST /api/rutas
export async function crearRuta(req, res) {
  try {
    const { nombre, ubicacion, imagen, tipo, recorrido } = req.body;

    if (!Array.isArray(recorrido) || recorrido.length === 0) {
      return res.status(400).json({ error: 'Tipo de ruta inválido o recorrido vacío' });
    }

    const nuevaRuta = new Ruta({ nombre, ubicacion, imagen, tipo, recorrido });
    await nuevaRuta.save();

    res.status(201).json(nuevaRuta);
  } catch (error) {
    console.error('❌ Error al crear la ruta:', error);
    res.status(500).json({ error: 'Error al crear la ruta' });
  }
}