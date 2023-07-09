const mongoose = require('mongoose');
const Requirement = require('../models/requirements.model');
const catchAsync = require('../utils/catchAsync');

/*const createRequirements = async(requirementBody) => {
  try {
      const requirementsetId = mongoose.Schema.Types.ObjectId;
      const requirement = new Requirement({...requirementBody, requirementsetId });
      const result = await requirement.save();
      return result;
  } catch (error) {
      console.log(error);
      throw new Error('Error saving user');
  }
};*/

const createRequirements=async(requirementBody)=>{
  const {requirement}=requirementBody;
  const requirementsetId = mongoose.Types.ObjectId();
  const requirementWithId = { ...requirement, requirementsetId };
  const reqStatus = await Requirement.create(requirementWithId);
    if (!reqStatus) {
        throw new Error('error something went wrong ');
    }
    const response = {
      requirement: reqStatus,
      requirementsetId
    };
    return response;
}



const getRequirements = async() => {
  try {
      const allRequirements = await Requirement.find().sort({
          'createdAt': -1
      });
      return allRequirements;
  } catch (error) {
      throw new Error('Error retrieving users');
  }
};

module.exports={createRequirements,getRequirements};