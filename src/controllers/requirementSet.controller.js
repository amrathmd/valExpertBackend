const catchAsync = require("../utils/catchAsync");
const requirementSetService = require("../services/requirementSet.service");

const createRequirementSet = catchAsync(async (req, res) => {
  const requirementSet = await requirementSetService.createRequirementSet(
    req.body
  );
  res.json(requirementSet);
});

const getRequirementSets = catchAsync(async (req, res) => {
  const requirementSets = await requirementSetService.getRequirementSets();
  res.json(requirementSets);
});

const getRequirementSetById = catchAsync(async (req, res) => {
  const requirementSetId = req.params.id;
  const requirementSet = await requirementSetService.getRequirementSetById(
    requirementSetId
  );
  res.json(requirementSet);
});

const deleteRequirementSet = catchAsync(async (req, res) => {
  const requirementSetId = req.params.id;
  await requirementSetService.deleteRequirementSet(requirementSetId);
  res.json({ message: "RequirementSet deleted successfully" });
});
const getRequirementSetByProjectId = catchAsync(async (req, res) => {
  const projectId = req.params.projectId;
  const requirementSet =
    await requirementSetService.getRequirementSetByProjectId(
      req.params.projectId
    );
  res.json(requirementSet);
});

module.exports = {
  createRequirementSet,
  getRequirementSets,
  getRequirementSetById,
  deleteRequirementSet,
  getRequirementSetByProjectId,
};
