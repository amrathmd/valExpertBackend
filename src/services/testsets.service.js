const mongoose = require('mongoose');
const Test = require('../models/testsets.model');
const RequirementSet = require('../models/requirementSet.model');
const Testcase = require('../models/testcases.model');
const Project = require('../models/project.model');
const catchAsync = require('../utils/catchAsync');

const createTestsets = async(tesetsetsBody) => {
    try {
        const { projectId,requirementSetId, ...rest } = tesetsetsBody;
        const projectset = await Project.findOne({_id: projectId});
        const requirementSet = await RequirementSet.findOne({ _id: requirementSetId });
        if (!requirementSet  || !projectset) {
            throw new Error('RequirementSet or Project not found');
        }

        const test = new Test({
            requirementSetId: requirementSet._id,
            projectId: projectset._id,
            ...rest,
        });

        const savedTestset = await test.save();

        requirementSet.testsetId=savedTestset._id;
        projectset.testsets.push(savedTestset._id);
        await requirementSet.save();
        await projectset.save();
        return savedTestset;
    } catch (error) {
        console.log(error);
        throw new Error('Error saving requirement');
    }
};

const getTestsets = async() => {
    const testsets = await Test.find().sort({ createdAt: -1 }).exec();
    return testsets;
};

const getTestsetById = async(testsetId) => {
    try {
        const test = await Test.findById(testsetId);
        if (!test) {
            throw new Error('Error: Testset not found');
        }
        return test;
    } catch (error) {
        console.error('Error retrieving Testset:', error);
        throw new Error('Error retrieving Testset');
    }
};

const deleteTestset = async(testsetIdId) => {
    const test = await Test.findById(testsetIdId);
    if (!test) {
        throw new Error('Error: Testset not found');
    }
    const projectset = await Project.findById(test.projectId);
    const requirementSet = await RequirementSet.findById(test.requirementSetId);
    if (!requirementSet || !projectset) {
        throw new Error('Error: RequirementSet or Projectset not found');
    }
    await Testcase.deleteMany({ testsetId });
    requirementSet.testsetId = null ;
    await requirementSet.save();
    await projectset.updateOne({ _id: test.projectId }, { $pull: { testsets: testsetId } });
    await projectset.save();
    const deletedTestset = await Test.findByIdAndDelete(testsetIdId);
    return deletedTestset;
};
module.exports = { createTestsets, getTestsets ,getTestsetById, deleteTestset };