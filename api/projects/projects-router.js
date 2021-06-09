// Write your "projects" router here!
const express = require('express');

const Project = require('./projects-model');

const { validateProjectId, validateProject } = require('../middleware/projectMiddleware');


const router = express.Router();

// GET /api/projects
router.get("/", async (req, res, next) => {
    try {
        const projects = await Project.get();
        res.status(200).json(projects);
    } catch (err) {next(err)}
});

// GET /api/projects/:id
router.get("/:id", validateProjectId, async (req, res) => {
    const { id } = req.params;
    const project = await Project.get(id);
    res.status(200).json(project);
});

// POST /api/projects
router.post("/", validateProject, async (req, res) => {
    const newProject = await Project.insert(req.body);
    res.status(201).json(newProject);
})

// PUT /api/projects/:id
router.put("/:id", validateProjectId, validateProject, async (req, res, next) => {
    const update = req.body;
    const { id } = req.params;
    const projectUpdated = await Project.update(id, update);
    projectUpdated
        ? res.status(200).json({ ...update, id })
        : next
})

// DELETE /api/projects/:id
router.delete("/:id", validateProjectId, async (req, res, next) => {
    const { id } = req.params;
    const projectDeleted = await Project.remove(id);
    projectDeleted
        ? res.status(200).json(id)
        : next
});

// GET /api/projects/:id/actions
router.get("/:id/actions", validateProjectId, async (req, res) => {
    const { id } = req.params;
    Project.getProjectActions(id)
    .then((actions) => {
        res.status(200).json(actions);
    })
});
    


module.exports = router;