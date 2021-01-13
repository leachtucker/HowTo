const express = require('express');

const helmet = require('helmet');
const cors = require('cors');

const postsRouter = require('./posts/router');

const server = express();

// MIDDLEWARE //
server.use(helmet());
server.use(cors());
server.use(express.json());

// ROUTERS //
server.use('/api/posts', postsRouter);

module.exports = server;