'use strict';
const express = require('express');
const dayjs = require('dayjs');

// Constants
const PORT = 8080;
const HOST = 'localhost';

// App
const app = express();
app.get('/', (req, res) => {
  const time = dayjs().format('YYYY-MM-DD hh:mm:ss SSS');
  res.send(`web : ${time}`);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
