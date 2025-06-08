// --- models/User.js ---
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['patient', 'doctor', 'admin'],
    default: 'patient',
  },
  specialization: {
    type: String,
    required: function() { return this.role === 'doctor'; },
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
  },
  availability: [{
    day: String,
    slots: [{
      startTime: String,
      endTime: String,
      isBooked: {
        type: Boolean,
        default: false,
      },
    }],
  }],
  pushToken: {
    type: String,
  },
  preferredLanguage: {
    type: String,
    default: 'en',
  },
  notificationSettings: {
    appointmentReminders: {
      type: Boolean,
      default: true,
    },
    marketingNotifications: {
      type: Boolean,
      default: false,
    },
    emergencyAlerts: {
      type: Boolean,
      default: true,
    },
  },
  emergencyContacts: [{
    name: String,
    relationship: String,
    phone: String,
  }],
  profileComplete: {
    type: Boolean,
    default: false,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Index for geospatial queries
userSchema.index({ location: '2dsphere' });

const User = mongoose.model('User', userSchema);

export default User;