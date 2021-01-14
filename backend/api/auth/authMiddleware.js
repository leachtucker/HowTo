const jwt = require('jsonwebtoken');

// Validates user's JWT if they are not on an login/register path
function validateToken () {
    return function (req, res, next) {
        const token = req.headers.authorization;

        // Verify that the user is not on a login/register path
        if (req.path === '/api/auth/login' || req.path === '/api/auth/register') {
            return next();
        }

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