import mongoose from 'mongoose';

// Subdocumento para estadísticas del usuario
const EstadisticasSchema = new mongoose.Schema({
  distanciaTotal: {
    type: Number,
    default: 0
  },
  rutasCompletadas: {
    type: Number,
    default: 0
  }
});

const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  fotoPerfil: {
    type: String
  },

  // Campo obligatorio para guardar el ID del usuario que nos da Google al autenticarse
  googleId: {
    type: String,
    required: true,
    unique: true // Nos aseguramos de que no se repita
  },

  // Email proporcionado por Google al autenticarse
  email: {
    type: String,
    required: true,
    unique: true
  },

  rutasCreadas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ruta'
    }
  ],
  logros: [String],
  estadisticas: {
    type: EstadisticasSchema,
    default: () => ({}) // Se inicializa con valores por defecto
  }
});

// Exportamos el modelo para usarlo en controladores y configuración de Passport
export default mongoose.model('Usuario', UsuarioSchema);

