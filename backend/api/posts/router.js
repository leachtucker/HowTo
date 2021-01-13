const express = require('express');
const Posts = require('./model');

const router = express.Router();

// END POINTS //
router.get('/', (req, res) => {
    Posts.getPosts()
        .then(results => {
            res.status(200).json(results);
        })
        .catch(() => {
            res.status(500).json();
        })
});

router.post('/', (req, res) => {
    const postData = req.body;

    Posts.insertPost(postData)
        .then(newPost => {
            res.status(201).json(newPost);
        })
        .catch(() => {
            res.status(500);
        });
});

module.exports = router;