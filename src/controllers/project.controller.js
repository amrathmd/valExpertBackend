const { projectService } = require('../services');
const catchAsync = require('../utils/catchAsync');

// Creating  a new project
const createProject = catchAsync(async(req, res) => {
    const status = await projectService.createProject(req.body);
    res.json(status);
});
const getProjects = catchAsync(async(req, res) => {
    const allProjects = await projectService.getProjects();
    res.json(allProjects);

})

module.exports = { createProject, getProjects }