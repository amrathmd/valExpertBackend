const Project = require("../models/project.model");
const RequirementSet = require("../models/requirementSet.model");
const Requirement = require("../models/requirements.model");
const Test = require("../models/testsets.model");
const Testcase = require("../models/testcases.model");

const createProject = async(projectBody) => {
    const projectStatus = new Project({
        requirementsets: [],
        testsets: [],
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
    const requirementSetIds = project.requirementsets;
    const testsetIds = project.testsets;
    //const testIds = await RequirementSet.find({ _id: { $in: requirementSetIds } }).distinct('testsetId');
    await Testcase.deleteMany({testsetId: {$in: testsetIds}});
    await Test.deleteMany({_id: { $in: testsetIds}});      
    await Requirement.deleteMany({ requirementSetId: { $in: requirementSetIds } });
    await Test.deleteMany({ _id: { $in: testIds } });
    await RequirementSet.deleteMany({ _id: { $in: requirementSetIds } });
    const deletedProject = await Project.findByIdAndDelete(projectId);
    return deletedProject;
};

module.exports = { createProject, getProjects, getProjectById, deleteProject }