const mongoose = require('mongoose');
const Requirement = require('../models/requirements.model');


const createRequirements = async(requirementBody) => {
    try {
        const requirementsetId = mongoose.Types.ObjectId();
        const requirement = new Requirement({...requirementBody, requirementsetId });
        const savedRequirement = await requirement.save();
        return savedRequirement;


    } catch (error) {
        console.log(error);
        throw new Error('Error saving requirement');
    }
};




const getRequirements = async() => {
    try {
        const allRequirements = await Requirement.find().sort({ createdAt: -1 });
        return allRequirements;
    } catch (error) {
        throw new Error('Error retrieving requirements');
    }
};

module.exports = { createRequirements, getRequirements };