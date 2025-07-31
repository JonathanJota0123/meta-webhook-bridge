// index.js
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const webhook = require('./webhook');
const initBot = require('./bot'); // <-- Importa el bot

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Ruta para Webhook de Meta o Make
app.use('/webhook', webhook);

// Inicializa el bot de WhatsApp
initBot();

// Ruta opcional para enviar mensajes manualmente (por POST)
app.post('/responder', async (req, res) => {
  const { to, text } = req.body;

  try {
    const client = require('./bot').clientInstance; // Se obtiene el cliente ya inicializado
    const chat = await client.getChatById(to);
    await chat.sendMessage(text);
    res.send('✅ Mensaje enviado');
  } catch (error) {
    console.error('❌ Error al responder:', error);
    res.status(500).send('Error al responder');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`);
});
