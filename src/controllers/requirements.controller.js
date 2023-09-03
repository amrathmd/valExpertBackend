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


const getRequirementsByRequirementSetId = catchAsync(async (req, res) => {
    const { requirementSetId } = req.params;
    const requirements = await requirementsService.getRequirementsByRequirementSetId(requirementSetId);
    res.json(requirements);
});

const getRequirementsByTestsetId = catchAsync(async (req, res) => {
    const { testsetId } = req.params;
    const requirements = await requirementsService.getRequirementsByTestsetId(testsetId);
    res.json(requirements);
});
  
const getRequirementsByTestscriptId = catchAsync(async (req, res) => {
    const { testscriptId } = req.params;
    const requirements = await requirementsService.getRequirementsByTestscriptId(testscriptId);
    res.json(requirements);
  });

  const updateRequirementTetscripts = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { testscripts } = req.body;
    const updatedTestscripts = await requirementsService.updateRequirementTetscripts(id, testscripts );
    res.json(updatedTestscripts);
  })

  const updateRequirementTetsteps = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { teststeps } = req.body;
    const updatedTeststeps = await requirementsService.updateRequirementTetsteps(id, teststeps );
    res.json(updatedTeststeps);
  })
  
module.exports = { 
    createRequirements, 
    getRequirements, 
    getRequirementById, 
    updateRequirement, 
    deleteRequirement , 
    getRequirementsByRequirementSetId,
    getRequirementsByTestsetId,
    getRequirementsByTestscriptId,
    updateRequirementTetscripts,
    updateRequirementTetsteps,
};