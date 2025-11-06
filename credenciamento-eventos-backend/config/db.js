import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export async function connectDB() {
  if (!process.env.MONGO_URI) {
    console.warn('MONGO_URI não definido. Preencha .env antes de conectar.');
    return;
  }
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('MongoDB conectado');
}

