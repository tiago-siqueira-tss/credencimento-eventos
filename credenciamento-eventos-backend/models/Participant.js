import mongoose from 'mongoose';

const ParticipantSchema = new mongoose.Schema({
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  name: String,
  email: String,
  phone: String,
  setor: String,
  qr_text: String,
  qr_data_url: String,
  pdf_path: String,
  created_at: { type: Date, default: Date.now }
});

export default mongoose.models.Participant || mongoose.model('Participant', ParticipantSchema);

