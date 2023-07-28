const mongoose = require('mongoose');
const Testcase = require('../models/testcases.model');
const Test = require('../models/testsets.model');


const createTestcases = async(testcaseBody) => {
    try {
        const { testsetId, ...test } = testcaseBody;
        const testset = await Test.findOne({ _id: testsetId });
        if (!testset) {
            throw new Error('Testset not found');
        }
        const testcase = new Testcase({
            testsetId: testset._id,
            ...test,
        });
        const savedTestcase = await testcase.save();
        testset.testcases.push(savedTestcase._id);
        await testset.save();
        return savedTestcase;
    } catch (error) {
        console.log(error);
        throw new Error('Error saving requirement');
    }
};


const getTestcases = async() => {
    try {
        const allTestcases = await Testcase.find().sort({ createdAt: -1 });
        return allTestcases;
    } catch (error) {
        throw new Error('Error retrieving Testcases');
    }
};


const getTestcaseById = async(testcaseId) => {
    try {
        const testcase = await Testcase.findById(testcaseId);
        if (!testcase) {
            throw new Error('Error: Testcase not found');
        }
        return testcase;
    } catch (error) {
        console.error('Error retrieving Testcase:', error);
        throw new Error('Error retrieving Testcase');
    }
};


const updateTestcase = async(testcaseId, updateData) => {
    try {
        const testcase = await Testcase.findByIdAndUpdate(
            testcaseId,
            updateData, { new: true }
        );
        if (!testcase) {
            throw new Error('Error: Testcase not found');
        }
        return testcase;
    } catch (error) {
        console.error('Error updating Testcase:', error);
        throw new Error('Error updating Testcase');
    }
};


const deleteTestcase = async(testcaseId) => {
    const testcase = await Testcase.findById(testcaseId);
    if (!testcase) {
        throw new Error('Error: Testcase not found');
    }
    const testset = await Test.findById(testcase.testsetId);
    if (!testset) {
        throw new Error('Error: Testset not found');
    }
    testset.testcases.pull(testcaseId);
    await testset.save();
    const deletedTestcase = await Testcase.findByIdAndDelete(testcaseId);
    return deletedTestcase;
};


module.exports = {
    createTestcases,
    getTestcases,
    getTestcaseById,
    updateTestcase,
    deleteTestcase
};