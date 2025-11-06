import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  location: String,
  description: String,
  image_url: String,
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.models.Event || mongoose.model('Event', EventSchema);

