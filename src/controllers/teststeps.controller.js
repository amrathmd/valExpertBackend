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


const getTeststeps = catchAsync(async(req, res) => {
    let allTeststeps = await teststepsService.getTeststeps();
    res.json(allTeststeps);
});

const getTeststepById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const teststep = await teststepsService.getTeststepById(id);
  res.json(teststep);
});



const deleteTeststep = catchAsync(async (req, res) => {
    const { id } = req.params;
    const deletedTeststep = await teststepsService.deleteTeststep(id);
    res.json(deletedTeststep);
});

const getTestStepsByTestcaseId = catchAsync(async (req,res) => {
    const { id } = req.params;
    const testSteps = await teststepsService.getTestStepsByTestcaseId( id );
    res.json(testSteps);
})

const getTeststepsByRequirement = catchAsync(async (req, res) => {
    const { id } = req.params;
    const teststeps = await teststepsService.getTeststepsByRequirement( id );
    res.json(teststeps);
})


const updateTeststepRequirement = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { requirements } = req.body;
    const updatedTestscripts = await requirementsService.updateTeststepRequirement(id, requirements );
    res.json(updatedTestscripts);

})
module.exports = { createTeststep, 
    getTeststeps, 
    getTeststepById, 
    deleteTeststep, 
    getTestStepsByTestcaseId, 
    getTeststepsByRequirement,
    updateTeststepRequirement
};