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

router.post('/', (req, res) => {
    const stepData = req.body;

    if (!stepData.step_name || !stepData.step_number || !stepData.post_id) {
        return res.status(400).json({
            message: "Missing required field. Required fields: {stepName, stepNumber, post_id}"
        })
    }

    Steps.findByStepPost(stepData.step_number, stepData.post_id)
        .then(result => {
            if (result) {
                return res.status(400).json({
                    message: "A step with that number already exits for this post"
                })
            }
        })
        .catch(() => {
            res.status(500)
        })

    Steps.insert(stepData)
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

router.put('/:id', (req, res) => {
    const { id } = req.params;

    const changes = req.body;

    Steps.update(id, changes)
        .then(updatedPost => {
            res.status(200).json(updatedPost);
        })
        .catch(() => {
            res.status(500).json({
                message: "An internal error has occured"
            })
        })
})

module.exports = router;