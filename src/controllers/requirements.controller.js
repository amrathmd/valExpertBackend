const { requirementsService } = require('../services');
const catchAsync = require('../utils/catchAsync');


const createRequirements = catchAsync(async(req, res) => {

    const result = await requirementsService.createRequirements(req.body);
    res.json(result);


});


const getRequirements = catchAsync(async(req, res) => {
    const allRequirements = await requirementsService.getRequirements();
    res.json(allRequirements);
});

module.exports = { createRequirements, getRequirements };