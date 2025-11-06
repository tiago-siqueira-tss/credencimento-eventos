import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import uploadRoutes from './routes/upload.js';
import eventsRoutes from './routes/events.js';
import participantsRoutes from './routes/participants.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({limit: '5mb'}));

// Conectar ao MongoDB (preencha MONGO_URI em .env)
await connectDB();

// Rotas
app.use('/upload', uploadRoutes);
app.use('/events', eventsRoutes);
app.use('/participants', participantsRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server rodando na porta ${port}`));

