import PDFDocument from 'pdfkit';
import qrcode from 'qrcode';

export async function gerarPdfParticipante(evento, participante) {
  const doc = new PDFDocument({ size: 'A4' });
  const buffers = [];
  doc.on('data', buffers.push.bind(buffers));

  if (evento.image_url) {
    try {
      doc.image(evento.image_url, { fit: [500, 150], align: 'center' });
    } catch (e) { }
  }

  doc.moveDown();
  doc.fontSize(20).text(evento.name, { align: 'center' });
  doc.moveDown(2);

  doc.fontSize(14).text(`Nome: ${participante.name}`);
  doc.text(`E-mail: ${participante.email}`);
  doc.text(`Telefone: ${participante.phone}`);
  doc.text(`Setor: ${participante.setor}`);
  doc.moveDown();

  const qrUrl = `${process.env.BACKEND_BASE_URL}/participants/validate/${participante._id}`;
  const qrDataUrl = await qrcode.toDataURL(qrUrl);
  const qrImage = qrDataUrl.replace(/^data:image\/png;base64,/, '');
  const qrBuffer = Buffer.from(qrImage, 'base64');
  doc.image(qrBuffer, { fit: [150, 150], align: 'left' });

  doc.end();
  await new Promise(res => doc.on('end', res));
  const pdfBuffer = Buffer.concat(buffers);
  return { pdfBuffer, qrDataUrl };
}

