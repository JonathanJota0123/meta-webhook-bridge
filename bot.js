const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');

const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL || 'https://hook.us2.make.com/XXXXXXXXXXXXX';

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true, // Cambia a false si quieres ver el navegador en local
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
});

client.on('qr', (qr) => {
  console.log('🔐 Escanea este QR en tu WhatsApp:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('✅ Cliente de WhatsApp listo');
});

client.on('message', async (message) => {
  const text = message.body;
  const from = message.from;

  console.log(`📨 Mensaje recibido de ${from}: ${text}`);

  // Enviar el mensaje a Make (Integromat)
  try {
    await axios.post(MAKE_WEBHOOK_URL, {
      from,
      text,
    });
  } catch (error) {
    console.error('❌ Error enviando a Make:', error.message);
  }
});

client.initialize();
