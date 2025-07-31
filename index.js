const express = require('express');
const bodyParser = require('body-parser');
const webhook = require('./webhook');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Usar el router corregido
app.use('/webhook', webhook);

app.listen(PORT, () => {
  console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`);
});

app.post('/responder', async (req, res) => {
  const { to, text } = req.body;

  try {
    const chat = await client.getChatById(to);
    await chat.sendMessage(text);
    res.send('✅ Mensaje enviado');
  } catch (error) {
    console.error('❌ Error al responder:', error);
    res.status(500).send('Error al responder');
  }
});

