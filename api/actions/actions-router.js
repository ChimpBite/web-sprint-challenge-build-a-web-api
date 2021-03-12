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
router.put("/:id", validateActionId, validateAction, async (req, res, next) => {
    const update = req.body;
    const { id } = req.params;
    const actionUpdated = await Action.update(id, update);
    actionUpdated
        ? res.status(200).json({ ...update, id })
        : next
})

// DELETE /api/actions/:id
router.delete("/:id", validateActionId, async (req, res, next) => {
    const { id } = req.params;
    const actionDeleted = await Action.remove(id);
    actionDeleted
        ? res.status(200).json(id)
        : next
});
    


module.exports = router;