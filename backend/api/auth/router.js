const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');

const Users = require('./users-model');

const router = express.Router();

const authMiddleware = require('./authMiddleware');
const validateToken = require('./authMiddleware');

router.post('/register', validateCredentials(), (req, res) => {
    const { username, password } = req.credentials;

    const rounds = process.env.BCRYPT_ROUNDS || 14;
    const passwordHash = bcrypt.hashSync(password, rounds);

    Users.insertUser({ username, password: passwordHash })
        .then(newUser => {
            res.status(201).json(newUser);
        })
        .catch(() => {
            res.status(500);
        });
})

router.post('/login', validateCredentials(), (req, res) => {
    const { username, password } = req.credentials;

    Users.findUserByUsername(username)
        .then(user => {
            if (!user || !bcrypt.compareSync(password, user.password)) {
                return res.status(400).json({
                    message: "Invalid credentials"
                });
            }
            const token = generateToken(user);
            res.status(200).json({ token: token });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Something went wrong..."
            })
        })
})

router.get('/user', validateToken(), (req, res) => {
    const { username } = req;

    Users.findUserByUsername(username)
        .then(user => {
            if (!user) {
                return res.status(500).json({
                    message: "An error has occured"
                })
            }

            const { username, user_id } = user;

            res.status(200).json({
                user_id,
                username
            });
        })

});

// MIDDLEWARE //
function validateCredentials() {
    return function (req, res, next) {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Missing required field. Required fields: {username, password}"
            })
        }

        req.credentials = {
            username,
            password
        }

        next();
    }
}

// HELPERS //
function generateToken(user) {
    const payload = {
        sub: user.user_id,
        username: user.username
    }

    const options = {
        expiresIn: '2d'
    }

    return jwt.sign(payload, process.env.JWT_SECRET || 'keep it secret, keep it safe', options);
}

module.exports = router;