// --- models/Appointment.js ---
import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  timeSlot: {
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'completed', 'cancelled', 'no-show'],
    default: 'scheduled'
  },
  type: {
    type: String,
    enum: ['first-visit', 'follow-up', 'consultation', 'emergency'],
    required: true
  },
  symptoms: [{
    type: String
  }],
  diagnosis: {
    type: String
  },
  prescription: [{
    medicine: String,
    dosage: String,
    frequency: String,
    duration: String,
    notes: String
  }],
  vitals: {
    bloodPressure: String,
    temperature: Number,
    heartRate: Number,
    respiratoryRate: Number,
    oxygenSaturation: Number
  },
  notes: {
    type: String
  },
  attachments: [{
    name: String,
    url: String,
    type: String
  }],
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'refunded'],
    default: 'pending'
  },
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  },
  cancellationReason: {
    type: String
  },
  followUpDate: {
    type: Date
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  meetingLink: {
    type: String
  },
  rating: {
    stars: {
      type: Number,
      min: 1,
      max: 5
    },
    review: String,
    createdAt: Date
  }
}, {
  timestamps: true
});

// Indexes for faster queries
appointmentSchema.index({ patientId: 1, appointmentDate: -1 });
appointmentSchema.index({ doctorId: 1, appointmentDate: -1 });
appointmentSchema.index({ status: 1 });

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;