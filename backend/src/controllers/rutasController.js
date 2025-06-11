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
    const {
      nombre,
      ubicacion,
      imagen,
      descripcion,
      dificultad,
      distanciaKm,
      duracionEstimada,
      altitud,
      recorrido,
      comentarios // opcional
    } = req.body;

    if (!Array.isArray(recorrido) || recorrido.length < 2) {
      return res.status(400).json({ error: 'El recorrido debe tener al menos dos puntos' });
    }

    const nuevaRuta = new Ruta({
      nombre,
      ubicacion,
      imagen,
      descripcion,
      dificultad,
      distanciaKm,
      duracionEstimada,
      altitud,
      recorrido,
      comentarios: comentarios || []
    });

    await nuevaRuta.save();
    res.status(201).json(nuevaRuta);
  } catch (error) {
    console.error('❌ Error al crear la ruta:', error);
    res.status(500).json({ error: 'Error al crear la ruta' });
  }
}

// GET /api/rutas/:id
export async function obtenerRutaPorId(req, res) {
  try {
    const ruta = await Ruta.findById(req.params.id)
      .populate('comentarios.usuarioId', 'nombre'); 

    if (!ruta) {
      return res.status(404).json({ error: 'Ruta no encontrada' });
    }

    res.status(200).json(ruta);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la ruta' });
  }
}


// POST /api/rutas/:id/comentarios
export async function agregarComentario(req, res) {
  try {
    const { id } = req.params;
    const { usuarioId, texto, valoracion, fecha } = req.body;

    if (!usuarioId || !texto) {
      return res.status(400).json({ error: 'usuarioId y texto son obligatorios' });
    }

    const ruta = await Ruta.findById(id);
    if (!ruta) {
      return res.status(404).json({ error: 'Ruta no encontrada' });
    }

    const nuevoComentario = {
      usuarioId,
      texto,
      fecha: fecha ? new Date(fecha) : new Date()
    };

    ruta.comentarios.push(nuevoComentario);
    await ruta.save();

    res.status(201).json({ mensaje: 'Comentario añadido', comentario: nuevoComentario });
  } catch (error) {
    console.error('Error al añadir el comentario:', error);
    res.status(500).json({ error: 'Error al añadir el comentario' });
  }
}
