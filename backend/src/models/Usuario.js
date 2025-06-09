import mongoose from 'mongoose';

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
  rutasCreadas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ruta'
    }
  ],
  logros: [String],
  estadisticas: {
    type: EstadisticasSchema,
    default: () => ({})
  }
});

export default mongoose.model('Usuario', UsuarioSchema);
