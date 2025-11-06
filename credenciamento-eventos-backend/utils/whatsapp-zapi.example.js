// Este arquivo é opcional e está comentado por padrão.
// Se você quiser usar a Z-API no futuro, descomente e preencha ZAPI_INSTANCE_ID e ZAPI_TOKEN no .env
/*
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const BASE = `https://api.z-api.io/instances/${process.env.ZAPI_INSTANCE_ID}/token/${process.env.ZAPI_TOKEN}`;

export async function enviarWhatsAppComLink(numero, mensagem, link) {
  try {
    await axios.post(`${BASE}/send-link`, {
      phone: numero,
      message: mensagem,
      linkUrl: link,
      linkTitle: 'Confirmação de Inscrição'
    });
  } catch (err) {
    console.error('Erro Z-API', err?.response?.data || err.message);
  }
}
*/

