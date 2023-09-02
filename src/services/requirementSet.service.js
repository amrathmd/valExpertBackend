const { Schema } = require("mongoose");
const RequirementSet = require("../models/requirementSet.model");
const Project = require("../models/project.model");
const Requirement = require("../models/requirements.model");
const Test = require("../models/testsets.model");
const Testscript = require("../models/testscripts.model");
const Teststep = require("../models/teststeps.model");
const { incrementVersion } = require("../utils/versionUtils");
const { mongoose } = require("../config/config");

const createRequirementSet = async (requirementSetBody) => {
  try {
    const { projectId, ...set } = requirementSetBody;
    const projectSet = await Project.findOne({ _id: projectId });

    if (!projectSet) {
      throw new Error("Project not found");
    }
    // Check for the latest version of the requirement set
    // const latestVersion = await RequirementSet.findOne({ projectId }).sort({ version: -1 });

    // // Calculate the new version based on the latest version
    // const newVersion = latestVersion ? incrementVersion(latestVersion.version) : "1.0.0";
    const requirementset = new RequirementSet({
      requirements: [],
      projectId: projectSet._id,
     // version: newVersion,
      ...set,
    });

    const savedRequirementSet = await requirementset.save();
    projectSet.requirementsets.push(savedRequirementSet._id);
    await projectSet.save();
    return savedRequirementSet;
  } catch (error) {
    console.log(error);
    throw new Error("Error saving requirementSet");
  }
};



const getRequirementSets = async () => {
  const requirementSets = await RequirementSet.find().sort({ createdAt: -1 });
  return requirementSets;
};

const getRequirementSetById = async (requirementSetId) => {
  const requirementSet = await RequirementSet.findById(requirementSetId);
  if (!requirementSet) {
    throw new Error("RequirementSet not found");
  }
  return requirementSet;
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
    throw error;
  }
};
const getRequirementSetByProjectId = async (projectId) => {
  const requirementSet = await RequirementSet.find({ projectId });
  return requirementSet;
};

module.exports = {
  createRequirementSet,
  getRequirementSets,
  getRequirementSetById,
  deleteRequirementSet,
  getRequirementSetById,
  getRequirementSetByProjectId,
};
