
const { projectService } = require('../services');
const catchAsync = require('../utils/catchAsync');

// Creating a new project
const createProject = catchAsync(async (req, res) => {
  try {
    const status = await projectService.createProject(req.body);
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: 'Error creating project', message: error.message });
  }
});

const getProjects = catchAsync(async (req, res) => {
  try {
    const allProjects = await projectService.getProjects();
    res.json(allProjects);
  } catch (error) {
    res.status(500).json({ error: 'Error getting projects', message: error.message });
  }
});

const getProjectById = catchAsync(async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await projectService.getProjectById(projectId);
    res.json(project);
  } catch (error) {
    res.status(404).json({ error: 'Project not found', message: error.message });
  }
});

const deleteProject = catchAsync(async (req, res) => {
  try {
    const projectId = req.params.id;
    await projectService.deleteProject(projectId);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting project', message: error.message });
  }
});

const generatePDF = catchAsync(async (req, res) => {
  try {
    const projectId = req.params.id;
    const pdfBuffer = await projectService.generatePDF(projectId);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=project_${projectId}.pdf`);
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ error: 'Error generating PDF', message: error.message });
  }
});

module.exports = { createProject, getProjects, getProjectById, deleteProject, generatePDF };
