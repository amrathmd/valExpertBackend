/*const { requirementsService } = require('../services');
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


const getRequirementsByProjectId = async (req, res) => {
    try {
      const { projectId } = req.params;
      console.log('Incoming request to fetch requirements for projectId:', projectId);
      const requirements = await requirementsService.getRequirementsByProjectId(projectId);
      console.log('Sending requirements response:', requirements);
      res.json(requirements);
    } catch (error) {
      console.error('Error handling request:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
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
    getRequirementsByProjectId
};*/

const { requirementsService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const createRequirements = catchAsync(async (req, res) => {
  try {
    const result = await requirementsService.createRequirements(req.body);
    res.json(result);
  } catch (error) {
    console.error('Error creating requirements:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const getRequirements = catchAsync(async (req, res) => {
  try {
    const allRequirements = await requirementsService.getRequirements();
    res.json(allRequirements);
  } catch (error) {
    console.error('Error fetching requirements:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const getRequirementById = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const requirement = await requirementsService.getRequirementById(id);
    res.json(requirement);
  } catch (error) {
    console.error('Error fetching requirement by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const updateRequirement = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRequirement = await requirementsService.updateRequirement(id, req.body);
    res.json(updatedRequirement);
  } catch (error) {
    console.error('Error updating requirement:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const deleteRequirement = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRequirement = await requirementsService.deleteRequirement(id);
    res.json(deletedRequirement);
  } catch (error) {
    console.error('Error deleting requirement:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const getRequirementsByRequirementSetId = catchAsync(async (req, res) => {
  try {
    const { requirementSetId } = req.params;
    const requirements = await requirementsService.getRequirementsByRequirementSetId(requirementSetId);
    res.json(requirements);
  } catch (error) {
    console.error('Error fetching requirements by RequirementSet ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const getRequirementsByProjectId = catchAsync(async (req, res) => {
  try {
    const { projectId } = req.params;
    console.log('Incoming request to fetch requirements for projectId:', projectId);
    const requirements = await requirementsService.getRequirementsByProjectId(projectId);
    console.log('Sending requirements response:', requirements);
    res.json(requirements);
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const getRequirementsByTestsetId = catchAsync(async (req, res) => {
  try {
    const { testsetId } = req.params;
    const requirements = await requirementsService.getRequirementsByTestsetId(testsetId);
    res.json(requirements);
  } catch (error) {
    console.error('Error fetching requirements by TestSet ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const getRequirementsByTestscriptId = catchAsync(async (req, res) => {
  try {
    const { testscriptId } = req.params;
    const requirements = await requirementsService.getRequirementsByTestscriptId(testscriptId);
    res.json(requirements);
  } catch (error) {
    console.error('Error fetching requirements by TestScript ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const updateRequirementTetscripts = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const { testscripts } = req.body;
    const updatedTestscripts = await requirementsService.updateRequirementTetscripts(id, testscripts);
    res.json(updatedTestscripts);
  } catch (error) {
    console.error('Error updating requirement test scripts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const updateRequirementTetsteps = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const { teststeps } = req.body;
    const updatedTeststeps = await requirementsService.updateRequirementTetsteps(id, teststeps);
    res.json(updatedTeststeps);
  } catch (error) {
    console.error('Error updating requirement test steps:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = {
  createRequirements,
  getRequirements,
  getRequirementById,
  updateRequirement,
  deleteRequirement,
  getRequirementsByRequirementSetId,
  getRequirementsByTestsetId,
  getRequirementsByTestscriptId,
  updateRequirementTetscripts,
  updateRequirementTetsteps,
  getRequirementsByProjectId,
};
