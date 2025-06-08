import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema({
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
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  },
  recordType: {
    type: String,
    enum: ['general', 'lab_result', 'prescription', 'imaging', 'vaccination', 'procedure'],
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  diagnosis: [{
    condition: String,
    icdCode: String,
    status: {
      type: String,
      enum: ['active', 'resolved', 'recurring']
    },
    notes: String
  }],
  vitals: {
    bloodPressure: {
      systolic: Number,
      diastolic: Number
    },
    temperature: Number,
    heartRate: Number,
    respiratoryRate: Number,
    oxygenSaturation: Number,
    weight: Number,
    height: Number,
    bmi: Number
  },
  labResults: [{
    testName: String,
    testDate: Date,
    result: String,
    normalRange: String,
    unit: String,
    interpretation: String,
    laboratoryName: String,
    attachments: [{
      name: String,
      url: String,
      type: String
    }]
  }],
  medications: [{
    name: String,
    dosage: String,
    frequency: String,
    duration: String,
    startDate: Date,
    endDate: Date,
    prescribedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['active', 'discontinued', 'completed']
    },
    notes: String
  }],
  allergies: [{
    allergen: String,
    reaction: String,
    severity: {
      type: String,
      enum: ['mild', 'moderate', 'severe']
    },
    diagnosedDate: Date
  }],
  immunizations: [{
    vaccine: String,
    date: Date,
    doseNumber: Number,
    administrator: String,
    location: String,
    nextDueDate: Date,
    batchNumber: String
  }],
  procedures: [{
    name: String,
    date: Date,
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    location: String,
    notes: String,
    complications: String,
    outcome: String
  }],
  imaging: [{
    type: String,
    date: Date,
    facility: String,
    result: String,
    interpretation: String,
    attachments: [{
      name: String,
      url: String,
      type: String
    }]
  }],
  notes: {
    subjective: String,
    objective: String,
    assessment: String,
    plan: String
  },
  attachments: [{
    name: String,
    url: String,
    type: String,
    uploadedAt: Date
  }],
  followUp: {
    required: Boolean,
    date: Date,
    notes: String
  },
  isConfidential: {
    type: Boolean,
    default: false
  },
  accessLog: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    action: String,
    timestamp: Date,
    ipAddress: String
  }]
}, {
  timestamps: true
});

// Indexes for faster queries
medicalRecordSchema.index({ patientId: 1, date: -1 });
medicalRecordSchema.index({ doctorId: 1, date: -1 });
medicalRecordSchema.index({ appointmentId: 1 });
medicalRecordSchema.index({ recordType: 1 });

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
export default MedicalRecord; 