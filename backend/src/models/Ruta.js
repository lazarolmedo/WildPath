import mongoose from 'mongoose';

const coordenadaSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true }
}, { _id: false }); // No genera _id para cada punto

const rutaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  ubicacion: { type: String, required: true },
  imagen: { type: String, required: true },
  tipo: { type: String, enum: ['fija'], required: true },
  recorrido: { type: [coordenadaSchema], required: true }
});

const Ruta = mongoose.model('Ruta', rutaSchema);
export default Ruta;
