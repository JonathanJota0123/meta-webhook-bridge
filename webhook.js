const express = require('express');
const axios = require('axios');
const router = express.Router();

const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "mi_token_verificacion_123";
const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL || "https://hook.us2.make.com/XXXXXXXXXXXXX";

router.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

router.post('/', async (req, res) => {
  try {
    await axios.post(MAKE_WEBHOOK_URL, req.body);
    res.sendStatus(200);
  } catch (error) {
    console.error("❌ Error al reenviar a Make:", error.message);
    res.sendStatus(500);
  }
});

module.exports = router;
