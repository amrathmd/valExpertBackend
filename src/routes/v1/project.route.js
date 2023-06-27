const express = require('express');
const { projectController } = require('../../controllers');
const Project = require("../../models/project.model");
const router = express.Router();
router
    .route('/')
    .post(projectController.createProject)
    .get(projectController.getProjects);



module.exports = router;