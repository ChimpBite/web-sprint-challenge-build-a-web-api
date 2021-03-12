// Write your "actions" router here!
const express = require('express');

const Action = require('./actions-model');

const { validateActionId, validateAction } = require('../middleware/actionMiddleware');


const router = express.Router();

// GET /api/actions
router.get("/", async (req, res, next) => {
    try {
        const actions = await Action.get();
        res.status(200).json(actions);
    } catch (err) {next(err)}
});

// GET /api/actions/:id
router.get("/:id", validateActionId, async (req, res) => {
    const { id } = req.params;
    const action = await Action.get(id);
    res.status(200).json(action);
});

// POST /api/actions
router.post("/", validateAction, async (req, res) => {
    const newAction = await Action.insert(req.body);
    res.status(201).json(newAction);
})

// PUT /api/actions/:id
router.put("/:id", async (req, res) => {
    if(!req.body) {
        res.status(400).json({ message: "All fields required" })
    } 
    await Action.update(req.params.id)
        .then((action) => {
            if (action) {
                res.status(202).json(action)
            } else {
                res.status(404).json({
                    message: "The action with the specified ID does not exist"
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "The action could not be modified."
            })
        })
})
    


module.exports = router;