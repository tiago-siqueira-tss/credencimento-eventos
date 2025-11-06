import express from 'express';
import Participant from '../models/Participant.js';
import Event from '../models/Event.js';
import { gerarPdfParticipante } from '../utils/pdf.js';
import { enviarConfirmacaoEmail } from '../utils/mailer.js';
// Z-API está opcional: utils/whatsapp-zapi.example.js (comentado)

const router = express.Router();

router.post('/:eventId', async (req, res) => {
  try {
    const { name, email, phone, setor } = req.body;
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ error: 'Evento não existe' });

    const participant = await Participant.create({ event_id: event._id, name, email, phone, setor });

    const { pdfBuffer, qrDataUrl } = await gerarPdfParticipante(event, participant);

    participant.qr_data_url = qrDataUrl;
    await participant.save();

    // Envia e-mail com anexo PDF
    enviarConfirmacaoEmail(email, event, participant, pdfBuffer).catch(console.error);

    // Se quiser enviar WhatsApp no futuro, suba o PDF em storage e use a Z-API (arquivo de exemplo fornecido)

    res.json({ ok: true, participant });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/validate/:id', async (req, res) => {
  const p = await Participant.findById(req.params.id).populate('event_id');
  if (!p) return res.status(404).send('Participante não encontrado');
  res.json({ valid: true, participant: p });
});

export default router;

