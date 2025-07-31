// bot.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');

const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL || 'https://hook.us2.make.com/XXXXXXXXXXXXX';

let client; // Variable para almacenar el cliente

function initBot() {
  client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      headless: true,
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
}

// Exportamos la función y el cliente
module.exports = {
  initBot,
  clientInstance: client,
};
