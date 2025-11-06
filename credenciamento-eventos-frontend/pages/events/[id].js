import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Evento() {
  const router = useRouter();
  const { id } = router.query;
  const [evento, setEvento] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', setor: '' });

  useEffect(() => {
    if (!id) return;
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events/${id}`).then(r => setEvento(r.data));
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/participants/${id}`, form);
    alert('Inscrição realizada — verifique seu e-mail');
  };

  if (!evento) return <div>Carregando...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      {evento.image_url && <img src={evento.image_url} alt="banner" style={{ maxWidth: '100%' }} />}
      <h1>{evento.name}</h1>
      <p>{evento.description}</p>

      <form onSubmit={handleSubmit} className="mt-6">
        <input required placeholder="Nome completo" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input required type="email" placeholder="E-mail" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input required placeholder="Telefone" onChange={e => setForm({ ...form, phone: e.target.value })} />
        <input required placeholder="Setor" onChange={e => setForm({ ...form, setor: e.target.value })} />
        <button type="submit">Confirmar Inscrição</button>
      </form>
    </div>
  );
}

