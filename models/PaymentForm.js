import mongoose from 'mongoose';

const paymentFormSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
  formData: Object,
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model('PaymentForm', paymentFormSchema);