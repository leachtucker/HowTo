const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

// IMPORT ROUTERS //
const postsRouter = require('./posts/router');

const server = express();

// MIDDLEWARE //
server.use(session({
    cookie: {
        // Max age set to 10 days
        maxAge: 1000 * 60 * 60 * 24 * 10,
        secure: process.env.SECURE_COOKIE || false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: process.env.USER_ALLOWED_COOKIES || true,
    name: "HowTo",
    secret: process.env.COOKIE_SECRET || "keep it secret, keep it safe"
}))
server.use(helmet());
server.use(express.json());
server.use(cors());

// ROUTERS //
server.use('/api/posts', postsRouter);

module.exports = server;