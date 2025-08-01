const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox'],
    headless: true
  }
});

client.on('qr', qr => {
  console.log('📱 Escanea este QR con tu WhatsApp:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('✅ Bot conectado correctamente a WhatsApp!');
});

client.on('message', async msg => {
  if (msg.body.toLowerCase() === 'hola') {
    await msg.reply('¡Hola! ¿En qué puedo ayudarte? 🤖');
  }
});

client.initialize();
