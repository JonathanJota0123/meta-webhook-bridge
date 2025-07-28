const express = require('express');
const bodyParser = require('body-parser');
const webhook = require('./webhook');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Ruta para el Webhook de verificación y recepción de mensajes
app.use('/webhook', webhook);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`);
});
