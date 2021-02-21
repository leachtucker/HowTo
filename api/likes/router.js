const router = require('express').Router();
const Likes = require('./model');
const Posts = require('../posts/model');

// Could by written with async try/catch calls. Would make the code much cleaner

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

router.post('/', async (req, res) => {
    try {
        const { post_id } = req.body;
        const { user_id } = req;

        if(!post_id) {
            return res.status(400).json({
                message: "Missing required parameters: {user_id, post_id}"
            })
        }

        // Check that the specified post exist
        const post = await Posts.findById(post_id);

        if (!post) {
            return res.status(400).json({
                message: "No post with that ID"
            })
        }

        // Check that a like doesn't already exist for that user and post -- a user can only like a post once
        const like = await Likes.findByPostUser(post_id, user_id);

        if (like) {
            return res.status(400).json({
                message: "Post already liked"
            })
        }

        const newLike = await Likes.insert(post_id, user_id);
        return res.status(201).json(newLike);
    } catch(err) {
        res.status(500);
    }
})

router.delete('/', async (req, res) => {
    try {
        const { post_id } = req.body;
        const { user_id } = req;

        // Check if the like exists
        const doesExist = await Likes.findByPostUser(post_id, user_id);

        if (!doesExist) {
            return res.status(400).json({
                message: "Does not exist"
            })
        }

        // Delete from DB
        await Likes.del(post_id, user_id);

        return res.status(200).json({
            message: "Like removed"
        })
    } catch (err) {
        console.log(err);
        res.status(500);
    }
})

module.exports = router;