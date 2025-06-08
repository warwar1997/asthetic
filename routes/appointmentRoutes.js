import express from 'express';
import Appointment from '../models/Appointment.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();

router.post('/', protect, async (req, res) => {
  const { doctorId, date, time } = req.body;
  const appointment = await Appointment.create({ doctorId, patientId: req.user.id, date, time });
  res.json(appointment);
});

router.get('/', protect, async (req, res) => {
  const criteria = req.user.role === 'doctor' ? { doctorId: req.user.id } : { patientId: req.user.id };
  const appointments = await Appointment.find(criteria).populate('doctorId patientId');
  res.json(appointments);
});

export default router;