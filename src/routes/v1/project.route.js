const express = require('express');
const { projectController } = require('../../controllers');
const Project = require("../../models/project.model");
const router = express.Router();
router
    .route('/')
    .post(projectController.createProject)
    .get(projectController.getProjects);

router
    .route('/:id')
    .get(projectController.getProjectById)
    .delete(projectController.deleteProject);

module.exports = router;