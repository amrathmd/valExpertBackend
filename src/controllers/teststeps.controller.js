
const { teststepsService, testsetsService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const mongoose = require('mongoose');

const createTeststep = catchAsync(async (req, res) => {
    try {
        const result = await teststepsService.createTeststep(req.body);
        res.json(result);
    } catch (error) {
        console.error('Error creating test step:', error);
        res.status(500).json({ message: 'Error creating test step.' });
    }
});

const getTeststeps = catchAsync(async (req, res) => {
    try {
        let allTeststeps = await teststepsService.getTeststeps();
        res.json(allTeststeps);
    } catch (error) {
        console.error('Error getting test steps:', error);
        res.status(500).json({ message: 'Error getting test steps.' });
    }
});

const getTeststepById = catchAsync(async (req, res) => {
    try {
        const { id } = req.params;
        const teststep = await teststepsService.getTeststepById(id);
        res.json(teststep);
    } catch (error) {
        console.error('Error getting test step by ID:', error);
        res.status(500).json({ message: 'Error getting test step by ID.' });
    }
});

const deleteTeststep = catchAsync(async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTeststep = await teststepsService.deleteTeststep(id);
        res.json(deletedTeststep);
    } catch (error) {
        console.error('Error deleting test step:', error);
        res.status(500).json({ message: 'Error deleting test step.' });
    }
});

const getTestStepsByTestcaseId = catchAsync(async (req, res) => {
    try {
        const { id } = req.params;
        const testSteps = await teststepsService.getTestStepsByTestcaseId(id);
        res.json(testSteps);
    } catch (error) {
        console.error('Error getting test steps by Testcase ID:', error);
        res.status(500).json({ message: 'Error getting test steps by Testcase ID.' });
    }
});

const getTeststepsByRequirement = catchAsync(async (req, res) => {
    try {
        const { id } = req.params;
        const teststeps = await teststepsService.getTeststepsByRequirement(id);
        res.json(teststeps);
    } catch (error) {
        console.error('Error getting test steps by Requirement ID:', error);
        res.status(500).json({ message: 'Error getting test steps by Requirement ID.' });
    }
});

const updateTeststepRequirement = catchAsync(async (req, res) => {
    try {
        const { id } = req.params;
        const { requirements } = req.body;
        const updatedTestscripts = await teststepsService.updateTeststepRequirement(id, requirements);
        res.json(updatedTestscripts);
    } catch (error) {
        console.error('Error updating test step requirement:', error);
        res.status(500).json({ message: 'Error updating test step requirement.' });
    }
});

module.exports = {
    createTeststep,
    getTeststeps,
    getTeststepById,
    deleteTeststep,
    getTestStepsByTestcaseId,
    getTeststepsByRequirement,
    updateTeststepRequirement
};
