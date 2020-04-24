const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 80;

app
  .use(express.static(path.join(__dirname, '../build')))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});
