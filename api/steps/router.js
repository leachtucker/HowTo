const router = require('express').Router();
const Steps = require('./model');

router.get('/', (req, res) => {
    Steps.get()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                message: "An internal error has occurred"
            })
        })
})

module.exports = router;