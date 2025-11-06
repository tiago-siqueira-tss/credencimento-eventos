import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/image', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Arquivo não enviado' });

  const stream = cloudinary.uploader.upload_stream({ folder: 'eventos' }, (error, result) => {
    if (error) return res.status(500).json({ error });
    res.json({ imageUrl: result.secure_url });
  });

  stream.end(req.file.buffer);
});

export default router;

