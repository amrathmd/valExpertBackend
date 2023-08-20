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
const getProjectById = catchAsync(async(req, res) => {
    const projectId = req.params.id;
    const project = await projectService.getProjectById(projectId);
    res.json(project);
});

const deleteProject = catchAsync(async(req, res) => {
    const projectId = req.params.id;
    await projectService.deleteProject(projectId);
    res.json({ message: 'Project deleted successfully' });
});

const generatePDF = catchAsync(async (req, res) => {
    const projectId = req.params.id;
    const pdfBuffer = await projectService.generatePDF(projectId);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=project_${projectId}.pdf`);
    res.send(pdfBuffer);
  });
module.exports = { createProject, getProjects, getProjectById, deleteProject, generatePDF }