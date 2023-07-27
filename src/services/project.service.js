const Project = require("../models/project.model");
const RequirementSet = require("../models/requirementSet.model");
const Requirement = require("../models/requirements.model");

const createProject = async(projectBody) => {
    const projectStatus = new Project({
        requirementsets: [],
        ...projectBody,
    });
    const createdProject = await projectStatus.save();
    return createdProject;
};

const getProjects = async() => {
    const projects = await Project.find().sort({
        'createdAt': -1
    });
    return projects;
}
const getProjectById = async(projectId) => {
    const project = await Project.findById(projectId);
    if (!project) {
        throw new Error('Error: Project not found');
    }
    return project;
};



const deleteProject = async(projectId) => {
    const project = await Project.findById(projectId);
    if (!project) {
        throw new Error("Error: Project not found");
    }

    await Requirement.deleteMany({ requirementSetId: { $in: project.requirementsets } });
    await RequirementSet.deleteMany({ _id: { $in: project.requirementsets } });

    const deletedProject = await Project.findByIdAndDelete(projectId);
    return deletedProject;
};

module.exports = { createProject, getProjects, getProjectById, deleteProject }