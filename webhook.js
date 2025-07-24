const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

const VERIFY_TOKEN = "mi_token_verificacion_123"; // el token que usarás en Meta
const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/XXXXXXXXXXXXX"; // <-- pega aquí la URL de Make

app.use(express.json());

app.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post('/', async (req, res) => {
  try {
    await axios.post(MAKE_WEBHOOK_URL, req.body);
    res.sendStatus(200);
  } catch (error) {
    console.error("❌ Error al reenviar a Make:", error.message);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
