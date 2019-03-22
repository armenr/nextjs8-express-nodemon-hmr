require('dotenv').config();
const next = require('next');
const express = require('express');

const start = async () => {
  try {

    const app = express();

    const nextApp = next({
      dev: process.env.NODE_ENV !== 'production',
      dir: './frontend'
    });
    const handle = nextApp.getRequestHandler();

    await nextApp.prepare();

    app.get('*', (req, res) => handle(req, res));

    await app.listen(process.env.PORT, process.env.HOST);
  } catch (e) {
    console.error(e);
  }
};

//fire it up
start();

// Log some stuff
process.env.NODE_ENV !== 'production'
  ? console.log(`DEV online at ${process.env.HOST}:${process.env.PORT}`)
  : console.log(`PROD online at ${process.env.HOST}:${process.env.PORT}`);