// --- models/Appointment.js ---
import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: String,
  time: String,
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
});

export default mongoose.model('Appointment', appointmentSchema);