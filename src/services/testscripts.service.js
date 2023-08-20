const mongoose = require("mongoose");
const Testscript = require("../models/testscripts.model");
const Test = require("../models/testsets.model");
const Teststep = require("../models/teststeps.model");

const createTestscript = async (testscriptBody) => {
  try {
    const { testsetId, ...test } = testscriptBody;

    const testset = await Test.findOne({ _id: testsetId });
    if (!testset) {
      throw new Error("Testset not found");
    }
    const testscript = new Testscript({
      testsetId: testset._id,
      teststeps: [],
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

module.exports = {
  createTestscript,
  getTestscripts,
  getTestscriptById,
  updateTestscript,
  deleteTestscript,
  getTestscriptByTestSetId,
};
