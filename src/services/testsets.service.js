const mongoose = require("mongoose");
const Test = require("../models/testsets.model");
const RequirementSet = require("../models/requirementSet.model");
const Testscript = require("../models/testscripts.model");
const Teststep = require("../models/teststeps.model");
const Project = require("../models/project.model");
const catchAsync = require("../utils/catchAsync");
const { incrementVersion } = require("../utils/versionUtils");

//creating a Testsetfv

const createTestsets = async (testsetsBody) => {
  try {
    const { projectId, requirementSetId, ...rest } = testsetsBody;
    console.log(projectId);
    console.log(requirementSetId);

    const projectset = await Project.findOne({ _id: projectId });
    const requirementSet = await RequirementSet.findOne({
      _id: requirementSetId,
    });

    if (!requirementSet || !projectset) {
      throw new Error("RequirementSet or Project not found");
    }

    
    // Check for the latest version of the test set
    const latestVersion = await Test.findOne({ projectId }).sort({ version: -1 });

    // Calculate the new version based on the latest version
    const newVersion = latestVersion ? incrementVersion(latestVersion.version) : "1.0.0";
    const test = new Test({
      requirementSetId,
      projectId,
      version: newVersion,
      testscripts: [],
      ...rest,
    });
    console.log(test);

    const savedTestset = await test.save();

    requirementSet.testsetId = savedTestset._id;
    projectset.testsets.push(savedTestset._id);

    await requirementSet.save();
    await projectset.save();

    return savedTestset;
  } catch (error) {
    console.log(error);
    throw new Error("Error saving testsets");
  }
};

//Retrieving all Testsets
const getTestsets = async () => {
  const testsets = await Test.find().sort({ createdAt: -1 }).exec();
  return testsets;
};

//get Testset by Id
const getTestsetById = async (testsetId) => {
  try {
    const test = await Test.findById(testsetId);
    if (!test) {
      throw new Error("Error: Testset not found");
    }
    return test;
  } catch (error) {
    console.error("Error retrieving Testset:", error);
    throw new Error("Error retrieving Testset");
  }
};

const getTestSetsByProjectId = async (projectId) => {
  const testsets = await Test.find({ projectId: projectId });
  return testsets;
};

const deleteTestset = async (testsetId) => {
  try {
    const testset = await Test.findById(testsetId);
    if (!testset) {
      throw new Error("Error: Testset not found");
    }

    const project = await Project.findById(testset.projectId);
    const requirementSet = await RequirementSet.findById(
      testset.requirementSetId
    );
    if (!requirementSet || !project) {
      throw new Error("Error: RequirementSet or Project not found");
    }

    const testscriptIds = await Testscript.distinct("_id", { testsetId });

    await Teststep.deleteMany({ testscriptId: { $in: testscriptIds } });
    await Testscript.deleteMany({ _id: { $in: testscriptIds } });

    requirementSet.testsetId = null;
    await requirementSet.save();
    project.testsets.pull(testsetId);
    await project.save();

    const deletedTestset = await Test.findByIdAndDelete(testsetId);

    return deletedTestset;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createTestsets,
  getTestsets,
  getTestsetById,
  deleteTestset,
  getTestSetsByProjectId,
};
