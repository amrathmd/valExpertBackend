const Teststep = require('../models/teststeps.model');
const Testscript = require('../models/testscripts.model');
const catchAsync = require('../utils/catchAsync');


const createTeststep = async (testStep) => {
  try {
    
    const {testscriptId} = testStep;
    const teststep = new Teststep(
      testStep);
    
      
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

const updateTeststep=async(testStepId,updatedTestStep)=>{
  try{
    const testStep= await Teststep.findByIdAndUpdate(testStepId,updatedTestStep,{
      new:true
    });
    return testStep;
  }catch{
    throw { statusCode: 500, message: "Error updating user." };
  }
}

const getTestStepsByTestcaseId= async(testscriptId)=>{
  const testSteps=await Teststep.find({testscriptId:testscriptId});
  console.log(testSteps);
  return testSteps;
}
module.exports = { createTeststep, getTeststeps, getTeststepById, deleteTeststep,getTestStepsByTestcaseId,updateTeststep};






