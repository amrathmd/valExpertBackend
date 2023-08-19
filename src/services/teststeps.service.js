const Teststep = require('../models/teststeps.model');
const Testscript = require('../models/testscripts.model');
const catchAsync = require('../utils/catchAsync');


const createTeststep = async (testscriptId, stepNumber, description, expectedResult, requirementIds) => {
  try {
    if (!testscriptId || !stepNumber || !description || !expectedResult || !Array.isArray(requirementIds)) {
      throw new Error('Invalid input data.');
    }

    const testscript = await Testscript.findById(testscriptId)
      .populate({
        path: 'testsetId',
        populate: {
          path: 'requirementSetId',
          populate: {
            path: 'requirements',
          },
        },
      })
      .exec();

    if (!testscript) {
      throw new Error('Testscript not found.');
    }

    const requirementSet = testscript.testsetId.requirementSetId;

    const validRequirementIds = requirementIds.filter((reqId) =>
      requirementSet.requirements.some((req) => req._id.equals(reqId))
    );

    const teststep = new Teststep({
      testscriptId,
      stepNumber,
      description,
      expectedResult,
      requirementId: validRequirementIds,
    });

    const savedTeststep = await teststep.save();
    await Testscript.updateOne(
      { _id: testscriptId },
      { $push: { teststeps: savedTeststep._id } }
    );
    return savedTeststep;
  } catch (error) {
  
    console.error('Error creating Teststep:', error);
    throw error;
  }
};


const getTeststeps = async () => {
  try {
    const allTeststeps = await Teststep.find();
    return allTeststeps;
  } catch (error) {
    console.error('Error fetching test steps:', error);
    throw error;
  }
};


const getTeststepById = async (id) => {
  try {
    const teststep = await Teststep.findById(id);
    return teststep;
  } catch (error) {
    console.error('Error fetching test step by ID:', error);
    throw error;
  }
};

const deleteTeststep = async (id) => {
  try {
    const teststep = await Teststep.findById(id);

    if (!teststep) {
      throw new Error('Test step not found.');
    }
    await Testscript.updateOne(
      { _id: teststep.testscriptId },
      { $pull: { teststeps: teststep._id } }
    );

    const deletedTeststep = await teststep.delete();
    return deletedTeststep;
  } catch (error) {
    console.error('Error deleting test step:', error);
    throw error;
  }
};

const getTestStepsByTestcaseId= async(testscriptId)=>{
  console.log(testscriptId)
  const testSteps=await Teststep.find({testscriptId:testscriptId})
  return testSteps;
}
module.exports = { createTeststep, getTeststeps, getTeststepById, deleteTeststep,getTestStepsByTestcaseId};






