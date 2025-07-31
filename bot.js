const puppeteer = require("puppeteer");

async function handleIncomingMessage(messageData) {
  // Aquí puedes extraer el texto del mensaje si deseas
  // const message = messageData.entry[0]?.changes[0]?.value?.messages[0]?.text?.body;

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto("https://example.com");

    // Realiza alguna acción con Puppeteer aquí si deseas

    await browser.close();
  } catch (error) {
    console.error("Error con Puppeteer:", error);
  }
}

module.exports = {
  handleIncomingMessage
};
