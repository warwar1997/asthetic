import express from 'express';
import { protect } from '../middleware/auth.js';
import User from '../models/User.js';
import Appointment from '../models/Appointment.js';

const router = express.Router();

// Get nearby doctors based on location
router.get('/nearby-doctors', async (req, res) => {
  const { latitude, longitude, radius } = req.query;
  try {
    const doctors = await User.find({
      role: 'doctor',
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: parseInt(radius) * 1000, // Convert km to meters
        },
      },
    });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Quick appointment booking
router.post('/quick-appointment', protect, async (req, res) => {
  const { doctorId, symptoms, preferredTime } = req.body;
  try {
    const appointment = await Appointment.create({
      doctorId,
      patientId: req.user.id,
      symptoms,
      preferredTime,
      status: 'pending',
      isQuickBook: true,
    });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get doctor availability slots
router.get('/doctor-slots/:doctorId', async (req, res) => {
  try {
    const doctor = await User.findById(req.params.doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor.availability);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile with mobile-specific fields
router.put('/update-profile', protect, async (req, res) => {
  const { pushToken, preferredLanguage, notificationSettings } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        pushToken,
        preferredLanguage,
        notificationSettings,
      },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Emergency contact endpoints
router.post('/emergency-contacts', protect, async (req, res) => {
  const { contacts } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { emergencyContacts: contacts } },
      { new: true }
    );
    res.json(user.emergencyContacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 