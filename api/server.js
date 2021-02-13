const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authMiddleware = require('./auth/authMiddleware');

// IMPORT ROUTERS //
const authRouter = require('./auth/router');
const postsRouter = require('./posts/router');
const stepsRouter = require('./steps/router');

const server = express();

// MIDDLEWARE //
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(authMiddleware());

// ROUTERS //
server.use('/api/auth', authRouter);
server.use('/api/posts', postsRouter);
server.use('/api/steps', stepsRouter);

// TEST ENDPOINT
server.get('/', (req, res) => {
    res.status(200).json({ message: "API up" });
})

module.exports = server;