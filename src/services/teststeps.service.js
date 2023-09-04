const Teststep = require('../models/teststeps.model');
const Testscript = require('../models/testscripts.model');
const catchAsync = require('../utils/catchAsync');

const createTeststep = async(teststepBody)=>
{
  try {
    const { testscriptId, ...test } = teststepBody;

    const testscript = await Testscript.findOne({ _id: testscriptId });
    if (!testscript) {
      throw new Error("Testscript not found");
    }

    const teststep = new Teststep({
      testscriptId: testscript._id,
      bugs: [],
      requirements: [],
      ...test,
    });

    const savedTeststep = await teststep.save();
    testscript.teststeps.push(savedTeststep._id);
    await testscript.save();
    return savedTeststep;
  } catch (error) {
    console.log(error);
    throw new Error("Error saving teststep");
  }
}


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

const deleteTeststep = async (teststepId) => {
  try {
    const teststep = await Teststep.findById(teststepId);

    if (!teststep) {
     throw new Error('Test step not found.');
    }
    
    await Testscript.updateOne(
      { _id: teststep.testscriptId },
      { $pull: { teststeps: teststep._id } }
    );

    const deletedTeststep = await teststep.deleteOne();
    return deletedTeststep;
  } catch (error) {
    console.error('Error deleting test step:', error);
    throw error;
  }
};


const getTestStepsByTestcaseId = async(testscriptId) => {
  console.log(testscriptId)
  const testSteps = await Teststep.find({testscriptId:testscriptId})
  return testSteps;
}

const getTeststepsByRequirement = async (requirementId) => {
  try {
    const requirement = await Requirement.findById(requirementId).populate('teststeps');

    if (!requirement) {
      throw new Error('Requirement not found');
    }
    const teststeps = requirement.teststeps;
    return teststeps;
  } catch (error) {
    throw new Error('Error fetching teststeps by requirement');
  }
};

const updateTeststepRequirement = async (teststepId, requirements) => {
  try {
      const existingTeststeps = await Testscript.findById(teststepId);
  
      if (!existingTeststeps) {
        throw new Error('Teststep not found');
      }
  
      existingTeststeps.requirements = [
        ...existingTeststeps.requirements,
        ...requirements,
      ];
  
      const updatedRequirement = await existingTeststeps.save();
  
      return updatedRequirement;
    } catch (error) {
      throw new Error('Error updating Teststeps');
    }
}
module.exports = { createTeststep, 
  getTeststeps, 
  getTeststepById, 
  deleteTeststep, 
  getTestStepsByTestcaseId, 
  getTeststepsByRequirement, 
  updateTeststepRequirement 
};






