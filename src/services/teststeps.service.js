const Teststep = require('../models/teststeps.model');
const Testcase = require('../models/testcases.model');
const catchAsync = require('../utils/catchAsync');


const createTeststep = async (testcaseId, stepNumber, description, expectedResult, requirementIds) => {
  try {
    if (!testcaseId || !stepNumber || !description || !expectedResult || !Array.isArray(requirementIds)) {
      throw new Error('Invalid input data.');
    }

    const testcase = await Testcase.findById(testcaseId)
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

    if (!testcase) {
      throw new Error('Testcase not found.');
    }

    const requirementSet = testcase.testsetId.requirementSetId;

    const validRequirementIds = requirementIds.filter((reqId) =>
      requirementSet.requirements.some((req) => req._id.equals(reqId))
    );

    const teststep = new Teststep({
      testcaseId,
      stepNumber,
      description,
      expectedResult,
      requirementId: validRequirementIds,
    });

    const savedTeststep = await teststep.save();
    await Testcase.updateOne(
      { _id: testcaseId },
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
    await Testcase.updateOne(
      { _id: teststep.testcaseId },
      { $pull: { teststeps: teststep._id } }
    );

    const deletedTeststep = await teststep.delete();
    return deletedTeststep;
  } catch (error) {
    console.error('Error deleting test step:', error);
    throw error;
  }
};

const getTestStepsByTestcaseId= async(testcaseId)=>{
  console.log(testcaseId)
  const testSteps=await Teststep.find({testcaseId:testcaseId})
  return testSteps;
}
module.exports = { createTeststep, getTeststeps, getTeststepById, deleteTeststep,getTestStepsByTestcaseId};






