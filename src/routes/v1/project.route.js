const express = require('express');
const { projectController } = require('../../controllers');
const router = express.Router();
router
    .route('/')
    .post(projectController.createProject);


module.exports = router;