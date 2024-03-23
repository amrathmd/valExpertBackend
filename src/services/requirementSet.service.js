
const RequirementSet = require("../models/requirementSet.model");
const Project = require("../models/project.model");
const Requirement = require("../models/requirements.model");
const Test = require("../models/testsets.model");
const Testscript = require("../models/testscripts.model");
const Teststep = require("../models/teststeps.model");
const { incrementVersion } = require("../utils/versionUtils");

const createRequirementSet = async (requirementSetBody) => {
  try {
    const { projectId, ...set } = requirementSetBody;
    const projectSet = await Project.findOne({ _id: projectId });

    if (!projectSet) {
      throw new Error("Project not found");
    }

    const requirementset = new RequirementSet({
      requirements: [],
      projectId: projectSet._id,
      ...set,
    });

    const savedRequirementSet = await requirementset.save();
    projectSet.requirementsets.push(savedRequirementSet._id);
    await projectSet.save();
    return savedRequirementSet;
  } catch (error) {
    console.error(error);
    throw new Error("Error saving requirementSet");
  }
};

const getRequirementSets = async () => {
  try {
    const requirementSets = await RequirementSet.find().sort({ createdAt: -1 });
    return requirementSets;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching requirement sets");
  }
};

const getRequirementSetById = async (requirementSetId) => {
  try {
    const requirementSet = await RequirementSet.findById(requirementSetId);
    if (!requirementSet) {
      throw new Error("RequirementSet not found");
    }
    return requirementSet;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching requirement set by ID");
  }
};

const deleteRequirementSet = async (requirementSetId) => {
  try {
    const requirementSet = await RequirementSet.findById(requirementSetId);
    if (!requirementSet) {
      throw new Error("Error: RequirementSet not found");
    }

    const testSetId = requirementSet.testsetId;
    if (testSetId) {
      const testset = await Test.findById(testSetId);
      if (testset) {
        const testscriptIds = testset.testscripts;
        const teststepIds = await Testscript.find({
          _id: { $in: testscriptIds },
        }).distinct("teststeps");
        await Teststep.deleteMany({ _id: { $in: teststepIds } });
        await Testscript.deleteMany({ _id: { $in: testscriptIds } });
        await Project.updateOne(
          { _id: requirementSet.projectId },
          { $pull: { testsets: testSetId } }
        );
        await Test.findByIdAndDelete(testSetId);
      }
    }

    await Requirement.deleteMany({ requirementSetId });

    await Project.updateOne(
      { _id: requirementSet.projectId },
      { $pull: { requirementsets: requirementSetId } }
    );

    const deletedRequirementSet = await RequirementSet.findByIdAndDelete(
      requirementSetId
    );

    return deletedRequirementSet;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getRequirementSetByProjectId = async (projectId) => {
  try {
    const requirementSet = await RequirementSet.find({ projectId });
    return requirementSet;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching requirement set by project ID");
  }
};

module.exports = {
  createRequirementSet,
  getRequirementSets,
  getRequirementSetById,
  deleteRequirementSet,
  getRequirementSetByProjectId,
};
