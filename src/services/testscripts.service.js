const mongoose = require("mongoose");
const Testscript = require("../models/testscripts.model");
const Test = require("../models/testsets.model");
const Teststep = require("../models/teststeps.model");
const Requirement = require("../models/requirements.model");
const Project = require('../models/project.model');

const createTestscript = async (testscriptBody) => {
  try {
    console.log(testscriptBody);
    const { testsetId, ...test } = testscriptBody;

    const testset = await Test.findOne({ _id:testsetId });
    if (!testset) {
      throw new Error("Testset not found");
    }

    const testscript = new Testscript({
      testsetId: testset._id,
      teststeps: [],
      requirements: [],
      run: [],
      bugs: [],
      ...test,
    });

    const savedTestscript = await testscript.save();
    testset.testscripts.push(savedTestscript._id);
    await testset.save();
    return savedTestscript;
  } catch (error) {
    console.log(error);
    throw new Error("Error saving testscript");
  }
};

const getTestscripts = async () => {
  try {
    const allTestscripts = await Testscript.find().sort({ createdAt: -1 });
    return allTestscripts;
  } catch (error) {
    throw new Error("Error retrieving Testscript");
  }
};

const getTestscriptById = async (testscriptId) => {
  try {
    const testscript = await Testscript.find(testscriptId);
    if (!testscript) {
      throw new Error("Error: Testscript not found");
    }
    return testscript;
  } catch (error) {
    console.error("Error retrieving Testscript:", error);
    throw new Error("Error retrieving Testscript");
  }
};

const updateTestscript = async (testscriptId, updateData) => {
  try {
    const testscript = await Testscript.findByIdAndUpdate(
      testscriptId,
      updateData,
      { new: true }
    );
    if (!testscript) {
      throw new Error("Error: Testscript not found");
    }
    return testscript;
  } catch (error) {
    console.error("Error updating Testscript:", error);
    throw new Error("Error updating Testscript");
  }
};

const updateRequirements = async (testscriptId, requirements) => {
  try {
    console.log(requirements);
    const existingTestscript = await Testscript.findById(testscriptId);

    if (!existingTestscript) {
      throw new Error('Testscript not found');
    }

    existingTestscript.requirements = [
      ...existingTestscript.requirements,
      ...requirements,
    ];

    const updatedTestscript = await existingTestscript.save();

    return updatedTestscript;
  } catch (error) {
    console.log(error);
    throw new Error('Error updating requirements');
  }
};

const deleteTestscript = async (testscriptId) => {
  try {
    console.log(testscriptId);
    const testscript = await Testscript.findById(testscriptId);
    if (!testscript) {
      throw new Error("Error: Testscript not found");
    }
    const testset = await Test.findById(testscript.testsetId);
    if (!testset) {
      throw new Error("Error: Testset not found");
    }
    await Teststep.deleteMany({ testscriptId });

    await Test.updateOne(
      { _id: testset._id },
      { $pull: { testscripts: testscriptId } }
    );
    const deletedTestscript = await Testscript.findByIdAndDelete(testscriptId);
    return deletedTestscript;
  } catch (error) {
    console.error("Error deleting test script:", error);
    throw error;
  }
};

const getTestscriptByTestSetId = async (testsetId) => {
  console.log(testsetId);
  const testscripts = await Testscript.find({ testsetId: testsetId });
  console.log(testscripts);
  return testscripts;
};

const getTestscriptsByRequirement = async (requirementId) => {
  try {
    const requirement = await Requirement.findById(requirementId).populate('testscripts');

    if (!requirement) {
      throw new Error('Requirement not found');
    }
    const testscripts = requirement.testscripts;
    return testscripts;
  } catch (error) {
    throw new Error('Error fetching testscripts by requirement');
  }
};

const getTestscriptsByProjectId = async (projectId) => {
  try {
    // Check if the project exists
    const project = await Project.findById(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    // Find all testsets for the project
    const testsets = await Test.find({ projectId });
    const testsetIds = testsets.map((testset) => testset._id);

    // Find all testscripts for the testsets
    const testscripts = await Testscript.find({ testsetId: { $in: testsetIds } });

    return testscripts;
  } catch (error) {
    throw new Error('Error fetching test scripts by project ID');
  }
};


const updateTestscriptRequirement = async (testscriptId, requirements) => {
  try {
      const existingTestscripts = await Testscript.findById(testscriptId);
  
      if (!existingTestscripts) {
        throw new Error('Testscript not found');
      }
  
      existingTestscripts.requirements = [
        ...existingTestscripts.requirements,
        ...requirements,
      ];
  
      const updatedRequirement = await existingTestscripts.save();
  
      return updatedRequirement;
    } catch (error) {
      throw new Error('Error updating Testscripts');
    }
}

module.exports = {
  getTestscriptsByRequirement,
};


module.exports = {
  createTestscript,
  getTestscripts,
  getTestscriptById,
  updateTestscript,
  deleteTestscript,
  getTestscriptByTestSetId,
  updateRequirements,
  getTestscriptsByRequirement,
  updateTestscriptRequirement,
  getTestscriptsByProjectId
};
