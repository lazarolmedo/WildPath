import mongoose from 'mongoose';

const ComentarioSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Usuario'
  },
  texto: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

const RutaSchema = new mongoose.Schema({
  nombre: String,
  ubicacion: String,
  imagen: String,
  descripcion: String,
  dificultad: {
    type: String,
    enum: ['baja', 'media', 'alta']
  },
  distanciaKm: Number,
  duracionEstimada: Number,
  travelMode: {
    type: String,
    enum: ['walking', 'biking'],
    default: 'walking'
  },
  altitud: Number,
  recorrido: [
    {
      lat: Number,
      lng: Number
    }
  ],
  comentarios: {
    type: [ComentarioSchema],
    default: []
  }
});

export default mongoose.model('Ruta', RutaSchema);
