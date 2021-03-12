// Write your "actions" router here!
const express = require('express');

const Action = require('./actions-model');


const router = express.Router();

// GET /api/actions
router.get("/", async (req, res, next) => {
    try {
        const actions = await Action.get();
        res.status(200).json(actions);
    } catch (err) {next(err)}
});

// GET /api/actions/:id
router.get("/:id", async (req, res) => {
    try {
        const action = await Action.get(req.params.id);
        if(!action){
            res.status(404).json({ message: "action not found" })
        } else {
            res.status(200).json(action);
        }
    } catch (err){
        res.status(500).json({message: 'Action could not be retrieved'});
    } 
});

// POST /api/actions
router.post("/", async (req, res) => {
    const newAction = await Action.insert(req.body)
    try {
        if(!req.body.description || !req.body.project_id){
            res.status(400).json({message: 'missing data'});
        } else {
            res.status(201).json(newAction);
        }
    } catch (err){
        res.status(500).json({message: 'Action could not be retrieved'});
    } 
})

module.exports = router;