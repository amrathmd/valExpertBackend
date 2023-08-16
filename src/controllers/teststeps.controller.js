const { teststepsService, testsetsService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const mongoose = require('mongoose');

const createTeststep = catchAsync(async (req, res) => {
    try {
        const { testcaseId, stepNumber, description, expectedResult, requirementId } = req.body;
        const result = await teststepsService.createTeststep(testcaseId, stepNumber, description, expectedResult, requirementId);
        res.json(result);
    } catch (error) {
        console.error('Error creating test step:', error);
        res.status(500).json({ message: 'Error creating test step.' });
    }
});


const getTeststeps = catchAsync(async(req, res) => {
    let allTeststeps = await teststepsService.getTeststeps();
    res.json(allTeststeps);
});

const getTeststepById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const teststep = await teststepsService.getTeststepById(id);
  res.json(teststep);
});



const deleteTeststep = catchAsync(async(req, res) => {
    const { id } = req.params;
    const deletedTeststep = await teststepsService.deleteTeststep(id);
    res.json(deletedTeststep);
});

const getTestStepsByTestcaseId=catchAsync(async(req,res)=>{
    const {id}=req.params;
    const testSteps=await teststepsService.getTestStepsByTestcaseId(id);
    res.json(testSteps);
})

module.exports = { createTeststep, getTeststeps, getTeststepById, deleteTeststep,getTestStepsByTestcaseId };