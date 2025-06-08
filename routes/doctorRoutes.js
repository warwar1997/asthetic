// --- routes/doctorRoutes.js ---
import express from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();

router.get('/', async (req, res) => {
  const doctors = await User.find({ role: 'doctor' });
  res.json(doctors);
});

router.put('/availability', protect, async (req, res) => {
  const { availability } = req.body;
  await User.findByIdAndUpdate(req.user.id, { availability });
  res.json({ message: 'Availability updated' });
});

export default router;
