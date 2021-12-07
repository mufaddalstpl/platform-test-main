// import express from 'express'
// import cors from 'cors'
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors({
  'origin': '*',
  'methods': '*',
  'preflightContinue': false
}));

app.get('/', (req, res) => {
  res.send('This is from express.js');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server started on port ${port}: http://localhost:${port}`);
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// import routes
app.use(require('./src/index'));

app.all('/*', (req, res, next)=> {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

module.exports = app;