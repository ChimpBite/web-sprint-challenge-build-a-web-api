require('dotenv').config();
const express = require('express');
const server = express();

const actionsRouter = require('./actions/actions-router');

server.use(express.json());
server.use('/api/actions', actionsRouter);

// Complete your server here!
// Do NOT `server.listen()` inside this file!

module.exports = server;
