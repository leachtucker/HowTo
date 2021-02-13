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

    // Validate postData
    if (!postData.title || !postData.description || !postData.user_id) {
        return res.status(401).json({
            message: "Missing required field. Required fields: {title, description, user_id}"
        })
    }

    Posts.insertPost(postData)
        .then(newPost => {
            res.status(201).json(newPost);
        })
        .catch(() => {
            res.status(500);
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    // Validate changes
    if (!changes) {
        return res.status(400).json({
            message: "Request body empty"
        })
    }

    Posts.updatePost(id, changes)
        .then(updatedPost => {
            res.status(200).json(updatedPost);
        })
        .catch(() => {
            res.status(500);
        })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Posts.deletePost(id)
        .then(deleted => {
            if (deleted) {
                res.status(200).json({ message: "Post deleted" });
            } else {
                res.status(404).json({
                    message: "No post with specified ID found"
                });
            }
        })
        .catch(() => {
            res.status(500);
        })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Posts.findById(id)
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    message: "No post with specified ID found"
                });
            }

            res.status(200).json(result);
        })
        .catch(() => {
            return res.status(500);
        })
});

router.get('/user/:id', (req, res) => {
    const { id } = req.params;

    Posts.findPostsByUserId(id)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(() => {
            res.status(500);
        })
});

router.get('/:id/steps', (req, res) => {
    const { id } = req.params;

    Posts.findStepsByPostId(id)
        .then(results => {
            if (!results) {
                return res.status(404).json({ message: "No post found with specified ID" });
            }

            res.status(200).json(results);
        })
        .catch(() => {
            res.status(500);
        })
});

router.post('/:id/steps', (req, res) => {
    const  { id } = req.params;
    const stepData = req.body;

    if (!stepData.stepName || !stepData.stepNumber || !stepData.post_id) {
        return res.status(400).json({
            message: "Missing required field. Required fields: {stepName, stepNumber, post_id}"
        })
    }

    Posts.insertStepByPostId(id, stepData)
        .then(newStep => {
            if (!newStep) {
                return res.status(404);
            }

            res.status(201).json(newStep);
        })
        .catch(() => {
            res.status(500);
        })
});

module.exports = router;