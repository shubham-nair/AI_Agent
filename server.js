const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// require your newly-converted JS functions
const { handler: geminiHandler } = require('./netlify/functions/gemini');
const { handler: generateHandler } = require('./netlify/functions/generate');

const app = express();
app.use(bodyParser.json());

// CORS preflight passthrough
app.options('/*', (_, res) => res.sendStatus(200));

// Mount Netlify-style functions under their routes
app.post('/.netlify/functions/gemini', async (req, res) => {
  const event = { httpMethod: 'POST', headers: req.headers, body: JSON.stringify(req.body) };
  const out = await geminiHandler(event);
  res.status(out.statusCode).set(out.headers || {}).send(out.body);
});
app.post('/.netlify/functions/generate', async (req, res) => {
  const event = { httpMethod: 'POST', headers: req.headers, body: JSON.stringify(req.body) };
  const out = await generateHandler(event);
  res.status(out.statusCode).set(out.headers || {}).send(out.body);
});

// Serve React build
app.use(express.static(path.join(__dirname, 'travel-planner/build')));
app.get('*', (_, res) =>
  res.sendFile(path.join(__dirname, 'travel-planner/build/index.html'))
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Listening on ${PORT}`)); 