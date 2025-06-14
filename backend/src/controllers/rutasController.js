import Ruta from '../models/Ruta.js';
import Usuario from '../models/Usuario.js';

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
    // Asegúrate de que el usuario está autenticado
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }

    const {
      nombre,
      ubicacion,
      imagen,
      descripcion,
      dificultad,
      distanciaKm,
      duracionEstimada,
      travelMode,
      altitud,
      recorrido,
      comentarios // opcional
    } = req.body;

    if (!Array.isArray(recorrido) || recorrido.length < 2) {
      return res.status(400).json({ error: 'El recorrido debe tener al menos dos puntos' });
    }

    // Crear la ruta
    const nuevaRuta = new Ruta({
      nombre,
      ubicacion,
      imagen,
      descripcion,
      dificultad,
      distanciaKm,
      duracionEstimada,
      travelMode,
      altitud,
      recorrido,
      comentarios: comentarios || []
    });

    await nuevaRuta.save();

    // Asociarla al usuario creador
    await Usuario.findByIdAndUpdate(req.user._id, {
      $push: { rutasCreadas: nuevaRuta._id }
    });

    res.status(201).location(`/api/rutas/${nuevaRuta._id}`).json(nuevaRuta);
  } catch (error) {
    console.error('Error al crear la ruta:', error);
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
    if (!req.user || !req.body.texto) {
      return res.status(400).json({ error: 'Usuario no autenticado o texto faltante' });
    }

    const { id } = req.params; // ← aquí estaba el error
    const usuarioId = req.user._id;
    const { texto } = req.body;

    const ruta = await Ruta.findById(id);
    if (!ruta) {
      return res.status(404).json({ error: 'Ruta no encontrada' });
    }

    const nuevoComentario = {
      usuarioId,
      texto,
      fecha: new Date()
    };

    ruta.comentarios.push(nuevoComentario);
    await ruta.save();

    res.status(201).json({ mensaje: 'Comentario añadido', comentario: nuevoComentario });
  } catch (error) {
    console.error('Error al añadir el comentario:', error);
    res.status(500).json({ error: 'Error al añadir el comentario' });
  }
}

// PATCH /api/rutas/:id
export async function actualizarRuta(req, res) {
  try {
    const { id } = req.params;
    const { nombre } = req.body;


    if (!nombre || typeof nombre !== 'string') {
      return res.status(400).json({ error: 'Nombre inválido' });
    }

    const ruta = await Ruta.findById(id);

    if (!ruta) {
      return res.status(404).json({ error: 'Ruta no encontrada' });
    }

    ruta.nombre = nombre;
    await ruta.save();

    res.status(200).json(ruta);
  } catch (error) {
    console.error('Error al actualizar la ruta:', error);
    res.status(500).json({ error: 'Error al actualizar la ruta' });
  }
}


// DELETE /api/rutas/:id
export async function eliminarRuta(req, res) {
  if (!req.user) {
    return res.status(401).json({ error: 'No autenticado' });
  }

  try {
    const rutaId = req.params.id;

    // Verificar si la ruta existe
    const ruta = await Ruta.findById(rutaId);
    if (!ruta) {
      return res.status(404).json({ error: 'Ruta no encontrada' });
    }

    // Verificar si pertenece al usuario actual
    const usuario = await Usuario.findById(req.user._id);
    if (!usuario.rutasCreadas.includes(rutaId)) {
      return res.status(403).json({ error: 'No autorizado para eliminar esta ruta' });
    }

    // Eliminar la ruta
    await Ruta.findByIdAndDelete(rutaId);

    // Eliminar referencia de rutasCreadas del usuario
    usuario.rutasCreadas = usuario.rutasCreadas.filter(id => id.toString() !== rutaId);
    await usuario.save();

    res.status(200).json({ mensaje: 'Ruta eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar ruta:', error);
    res.status(500).json({ error: 'Error interno al eliminar la ruta' });
  }
}