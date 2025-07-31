// index.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const { getQrCode } = require('./bot'); // Importa el QR desde bot.js

app.get('/', (req, res) => {
  res.send('🤖 El servidor Express está funcionando.');
});

app.get('/qr', (req, res) => {
  const qr = getQrCode();
  if (!qr) return res.send('🔄 QR aún no generado. Intenta nuevamente en unos segundos.');
  res.send(`<h2>Escanea este código QR con tu WhatsApp:</h2><img src="${qr}" />`);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor Express en línea: http://localhost:${PORT}`);
});
