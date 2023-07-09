const { requirementsService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const mongoose = require('mongoose');

const createRequirements = catchAsync(async(req, res) => {
    const result = await requirementsService.createRequirements(req.body);
    res.json(result);
});

const getRequirements = catchAsync(async(req, res) => {
    let allRequirements = await requirementsService.getRequirements();
    res.json(allRequirements);
});

module.exports = { createRequirements, getRequirements };