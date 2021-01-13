const jwt = require('jsonwebtoken');

function validateToken () {
    return function (req, res, next) {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(400).json({
                message: "No auth token"
            })
        }

        jwt.verify(token, process.env.JWT_SECRET || 'keep it secret, keep it safe', (err, decodedToken) => {
            if (err) {
                return res.status(401).json({
                    message: "Invalid token"
                })
            }

            const { username, sub } = decodedToken;
            req.username = username;
            req.user_id = sub;

            next();
        })
    }
}

module.exports = validateToken;