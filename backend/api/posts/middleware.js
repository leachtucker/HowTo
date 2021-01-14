function validateCredentials() {
    return function (req, res, next) {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(401).json({
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