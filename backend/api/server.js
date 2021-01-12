const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

// MIDDLEWARE //
server.use(helmet());
server.use(cors());
server.use(express.json());

module.exports = server;