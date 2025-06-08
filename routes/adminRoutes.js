// --- routes/adminRoutes.js ---
import express from 'express';
import User from '../models/User.js';
import Appointment from '../models/Appointment.js';
const router = express.Router();

router.get('/stats', async (req, res) => {
  const doctors = await User.countDocuments({ role: 'doctor' });
  const patients = await User.countDocuments({ role: 'patient' });
  const appointments = await Appointment.countDocuments();
  res.json({ doctors, patients, appointments });
});

export default router;