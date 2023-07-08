const mongoose = require('mongoose');
const Test = require('../models/testsets.model');
const catchAsync = require('../utils/catchAsync');

const createTestsets = async(testsetsBody) => {
    try {
        const { testSet } = testsetsBody;
        const testsetId = mongoose.Types.ObjectId();
        const reqsetId = mongoose.Types.ObjectId();
        testSet.testsetId = testsetId;
        testSet.reqsetId = reqsetId;

        const testStatus = await Test.create(testSet);
        if (!testStatus) {
            throw new Error('Error: Something went wrong');
        }

        return testStatus;
    } catch (error) {
        console.error(error);
        throw new Error('Error: Failed to create test');
    }
};

const getTestsets = async() => {
    const testsets = await Test.find().sort({ createdAt: -1 }).exec();
    return testsets;
};

module.exports = { createTestsets, getTestsets };