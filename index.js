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
