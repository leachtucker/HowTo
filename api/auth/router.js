const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');

const Users = require('./users-model');

const router = express.Router();

router.post('/register', validateCredentials(), (req, res) => {
    const { username, password } = req.credentials;

    const rounds = process.env.BCRYPT_ROUNDS || 14;
    const passwordHash = bcrypt.hashSync(password, rounds);

    // Check that no user already has this username
    Users.findUserByUsername(username)
        .then(result => {
            if (result) {
                return res.status(400).json({
                    message: "Username taken. Choose another"
                })
            }
        })
        .catch(() => {
            return res.status(500).json({
                message: "An internal error occurred..."
            })
        })
    // Insert user
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

router.get('/whoami', (req, res) => {
    const token = req.headers.authorization;
    jwt.verify(token, process.env.JWT_SECRET || 'keep it secret, keep it safe', (err, decoded) => {
        if (err) {
            return res.status(400).json({
                message: "Invalid token. Login to generate new token"
            })
        }

        return res.status(200).json(decoded);
    })
})

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