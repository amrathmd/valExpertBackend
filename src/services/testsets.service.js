const mongoose = require('mongoose');
const Test = require('../models/testsets.model');
const RequirementSet = require('../models/requirementSet.model');
const catchAsync = require('../utils/catchAsync');

const createTestsets = async(tesetsetsBody) => {
    try {
        const { requirementSetId, ...rest } = tesetsetsBody;

        const requirementSet = await RequirementSet.findOne({ _id: requirementSetId });

        if (!requirementSet) {
            throw new Error('RequirementSet not found');
        }

        const test = new Test({
            requirementSetId: requirementSet._id,
            ...rest,
        });

        const savedTestset = await test.save();

        requirementSet.testsetId=savedTestset._id;
        await requirementSet.save();

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

    const requirementSet = await RequirementSet.findById(test.requirementSetId);
    if (!requirementSet) {
        throw new Error('Error: RequirementSet not found');
    }

    
    requirementSet.testsetId = null ;
    await requirementSet.save();

    const deletedTestset = await Test.findByIdAndDelete(testsetIdId);
    return deletedTestset;
};
module.exports = { createTestsets, getTestsets ,getTestsetById, deleteTestset };