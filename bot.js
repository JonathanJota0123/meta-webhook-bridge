// bot.js

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const fs = require('fs');

let qrCodeImage = ''; // QR en formato base64 accesible desde index.js

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

client.on('qr', async (qr) => {
  console.log('✅ QR generado. Escanéalo desde /qr');

  try {
    qrCodeImage = await qrcode.toDataURL(qr);
  } catch (err) {
    console.error('❌ Error generando QR:', err);
  }
});

client.on('ready', () => {
  console.log('🤖 Bot de WhatsApp conectado correctamente.');
});

client.on('message', async (message) => {
  if (message.body.toLowerCase() === 'hola') {
    await message.reply('¡Hola! ¿En qué puedo ayudarte hoy?');
  }
});

client.initialize();

// Exportar QR para que index.js lo sirva
module.exports = {
  getQrCode: () => qrCodeImage
};
