const { requirementsService } = require('../services');
const catchAsync = require('../utils/catchAsync');


const createRequirements = catchAsync(async(req, res) => {
    const result = await requirementsService.createRequirements(req.body);
    res.json(result);


})
const getRequirements = catchAsync(async(req, res) => {
    const allRequirements = await requirementsService.getRequirements();
    res.json(allRequirements);
});

const getRequirementById = catchAsync(async(req, res) => {
    const { id } = req.params;
    const requirement = await requirementsService.getRequirementById(id);
    res.json(requirement);
});

const updateRequirement = catchAsync(async(req, res) => {
    const { id } = req.params;
    const updatedRequirement = await requirementsService.updateRequirement(id, req.body);
    res.json(updatedRequirement);
});

const deleteRequirement = catchAsync(async(req, res) => {
    const { id } = req.params;
    const deletedRequirement = await requirementsService.deleteRequirement(id);
    res.json(deletedRequirement);
});

module.exports = { createRequirements, getRequirements, getRequirementById, updateRequirement, deleteRequirement };