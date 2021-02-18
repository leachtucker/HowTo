const router = require('express').Router();
const Likes = require('./model');

// Responds with all the client's likes as an array. Find's client with info stored in their JWT
router.get('/', (req, res) => {
    const { user_id } = req;

    Likes.findByUserId(user_id)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(() => {
            res.status(500);
        })
})

router.post('/', (req, res) => {
    const { post_id } = req.body;
    const { user_id } = req;

    if(!post_id) {
        return res.status(400).json({
            message: "Missing required parameters: {user_id, post_id}"
        })
    }

    // Check that a like doesn't already exist for that user and post -- a user can only like a post once
    Likes.findByPostUser(post_id, user_id)
        .then(result => {
            if (result) {
                return res.status(400).json({
                    message: "You can only like a post once"
                })
            }
        })
        .catch(() => {
            res.status(500);
        })

    Likes.insert(post_id, user_id)
        .then(newLike => {
            res.status(201).json(newLike);
        })
        .catch(() => {
            res.status(500);
        })
})

module.exports = router;