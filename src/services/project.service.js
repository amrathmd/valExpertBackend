const Project = require("../models/project.model");
const RequirementSet = require("../models/requirementSet.model");
const Requirement = require("../models/requirements.model");
const Test = require("../models/testsets.model");
const Testscript = require("../models/testscripts.model");
const Teststep = require("../models/teststeps.model");

const createProject = async(projectBody) => {
    const projectStatus = new Project({
        requirementsets: [],
        testsets: [],
        scope:[],
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



const deleteProject = async (projectId) => {
    try {
        const project = await Project.findById(projectId).exec();
        if (!project) {
            throw new Error("Error: Project not found");
        }

        const requirementSetIds = project.requirementsets;
        const testsetIds = project.testsets;

        
        const testScripts = await Testscript.find({ testsetId: { $in: testsetIds } }).select('_id').lean().exec();
        const testScriptIds = testScripts.map(script => script._id);

    
        await Promise.all([
            Teststep.deleteMany({ testscriptId: { $in: testScriptIds } }).exec(),
            Testscript.deleteMany({ _id: { $in: testScriptIds } }).exec(),
            Requirement.deleteMany({ requirementSetId: { $in: requirementSetIds } }).exec(),
            Test.deleteMany({ _id: { $in: testsetIds } }).exec(),
            RequirementSet.deleteMany({ _id: { $in: requirementSetIds } }).exec()
        ]);

    
        const deletedProject = await Project.findByIdAndDelete(projectId).exec();

        return deletedProject;
    } catch (error) {
        throw error;
    }
};




module.exports = { createProject, getProjects, getProjectById, deleteProject }