import express from 'express';
import Event from '../models/Event.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const ev = await Event.create(req.body);
    res.json(ev);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const ev = await Event.findById(req.params.id);
    res.json(ev);
  } catch (err) {
    res.status(404).json({ error: 'Evento não encontrado' });
  }
});

export default router;

