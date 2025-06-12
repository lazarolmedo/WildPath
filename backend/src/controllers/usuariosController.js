import Usuario from '../models/Usuario.js';

// GET /api/usuarios
export async function listarUsuarios(req, res) {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
}

// POST /api/usuarios
export async function crearUsuario(req, res) {
  try {
    const {
      nombre,
      fotoPerfil,
      rutasCreadas,
      logros,
      estadisticas
    } = req.body;

    const nuevoUsuario = new Usuario({
      nombre,
      fotoPerfil,
      rutasCreadas: rutasCreadas || [],
      logros: logros || [],
      estadisticas: estadisticas || { distanciaTotal: 0, rutasCompletadas: 0 }
    });

    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(400).json({ error: 'Datos inválidos o error al guardar' });
  }
}

// GET /api/usuarios/:id
export async function obtenerUsuarioPorId(req, res) {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
}

// GET /api/usuarios/yo
export async function obtenerUsuarioActual(req, res) {
  // Esta ruta se usa para obtener el usuario que ha iniciado sesión
  // Passport guarda automáticamente el objeto `req.user` si el usuario está autenticado con Google
  if (!req.user) {
    return res.status(401).json({ error: 'No autenticado' }); // Si no hay sesión activa, devolvemos 401
  }

  res.json(req.user); // Si está autenticado, respondemos con los datos del usuario
}

// PATCH /api/usuarios/yo
export async function actualizarNombreUsuario(req, res) {
  if (!req.user) return res.status(401).json({ error: 'No autenticado' });

  try {
    const { nombre } = req.body;

    // Validar nombre (evita valores vacíos o incorrectos)
    if (!nombre || typeof nombre !== 'string') {
      return res.status(400).json({ error: 'Nombre inválido' });
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.user._id,
      { nombre },
      { new: true }
    );

    res.status(200).json(usuarioActualizado);
  } catch (error) {
    console.error('Error al actualizar el nombre:', error);
    res.status(500).json({ error: 'Error al actualizar el nombre' });
  }
}

