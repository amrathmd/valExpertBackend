const { projectService } = require('../services');
const catchAsync = require('../utils/catchAsync');

// Creating  a new project
const createProject = catchAsync(async(req, res) => {
    const { status, code, message, info } = await projectService.createProject(req.body);
    res.status(code).json(message, info);
});

module.exports = { createProject }