import { useState } from 'react';
import axios from 'axios';

export default function CriarEvento() {
  const [form, setForm] = useState({ name: '', date: '', location: '', description: '' });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImage = e => {
    const f = e.target.files[0];
    setImage(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    let imageUrl = '';
    if (image) {
      const fd = new FormData();
      fd.append('image', image);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/image`, fd);
      imageUrl = res.data.imageUrl;
    }

    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events`, { ...form, image_url: imageUrl });
    alert('Evento criado com sucesso');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6">
      <h2>Cadastrar Evento</h2>
      <input required placeholder="Nome do evento" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input type="date" required onChange={e => setForm({ ...form, date: e.target.value })} />
      <input required placeholder="Local" onChange={e => setForm({ ...form, location: e.target.value })} />
      <textarea required placeholder="Descrição" onChange={e => setForm({ ...form, description: e.target.value })} />
      <input type="file" accept="image/*" onChange={handleImage} />
      {preview && <img src={preview} alt="preview" style={{ maxWidth: 300 }} />}
      <button type="submit">Criar Evento</button>
    </form>
  );
}

