import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASS
  }
});

export async function enviarConfirmacaoEmail(to, evento, participante, pdfBuffer) {
  const html = `
    <h2>Confirmação de Inscrição - ${evento.name}</h2>
    <p>Olá ${participante.name},</p>
    <p>Sua inscrição foi confirmada. Em anexo está o seu credenciamento em PDF com o QR Code.</p>
    <p><strong>Dados do participante</strong></p>
    <ul>
      <li>Nome: ${participante.name}</li>
      <li>E-mail: ${participante.email}</li>
      <li>Telefone: ${participante.phone}</li>
      <li>Setor: ${participante.setor}</li>
    </ul>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_ADDRESS,
    to,
    subject: `Confirmação de Inscrição - ${evento.name}`,
    html,
    attachments: [
      { filename: 'credenciamento.pdf', content: pdfBuffer }
    ]
  });
}

