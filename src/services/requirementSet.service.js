const { Schema } = require('mongoose');
const RequirementSet = require("../models/requirementSet.model");
const Project = require("../models/project.model");
const Requirement = require("../models/requirements.model");
const Test = require("../models/testsets.model")
const Testcase = require("../models/testcases.model");
const { mongoose } = require('../config/config');


const createRequirementSet = async(requirementSetBody) => {
    try {
        const { projectId, ...set } = requirementSetBody;
        const projectSet = await Project.findOne({ _id: projectId });

        if (!projectSet) {
            throw new Error('Project not found');
        }

        const requirementset = new RequirementSet({
            requirements: [],
            projectId: projectSet._id,
            ...set,
        });

        const savedRequirementSet = await requirementset.save();
        projectSet.requirementsets.push(savedRequirementSet._id);
        await projectSet.save();
        return savedRequirementSet;
    } catch (error) {
        console.log(error);
        throw new Error('Error saving requirementSet');
    }
};


const getRequirementSets = async() => {
    const requirementSets = await RequirementSet.find().sort({ createdAt: -1 });
    return requirementSets;
};


const getRequirementSetById = async(requirementSetId) => {
    const requirementSet = await RequirementSet.findById(requirementSetId);
    if (!requirementSet) {
        throw new Error('RequirementSet not found');
    }
    return requirementSet;
};


const deleteRequirementSet = async(requirementSetId) => {
    const requirementSet = await RequirementSet.findById(requirementSetId);
    if (!requirementSet) {
        throw new Error("Error: RequirementSet not found");
    }

    const testSetId = requirementSet.testsetId;
    const testset = await Test.findById(testSetId);
    if (testset) {
        await Testcase.deleteMany({ testsetId: testSetId });
        await Project.updateOne({ _id: requirementSet.projectId }, { $pull: { testsets: testSetId } });
        await Test.findByIdAndDelete(testSetId);
    }
    await Requirement.deleteMany({ requirementSetId });
    await Project.updateOne({ _id: requirementSet.projectId }, { $pull: { requirementsets: requirementSetId } });
    const deletedRequirementSet = await RequirementSet.findByIdAndDelete(requirementSetId);
    return deletedRequirementSet;
};


module.exports = {
    createRequirementSet,
    getRequirementSets,
    getRequirementSetById,
    deleteRequirementSet,
};