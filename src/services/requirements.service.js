const mongoose = require('mongoose');
const Requirement = require('../models/requirements.model');
const RequirementSet = require('../models/requirementSet.model');
const { v4: uuidv4 } = require('uuid');


const createRequirements = async(requirementBody) => {
    try {
        console.log("hii i am in requirement@");
        const { requirementSetId, ...rest } = requirementBody;

        const requirementSet = await RequirementSet.findOne({ _id: requirementSetId });

        if (!requirementSet) {
            throw new Error('RequirementSet not found');
        }

        const requirement = new Requirement({
            requirementSetId: requirementSet._id,
            ...rest,
        });

        const savedRequirement = await requirement.save();

        requirementSet.requirements.push(savedRequirement._id);
        await requirementSet.save();

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


const getRequirementById = async(requirementId) => {
    try {
        const requirement = await Requirement.findById(requirementId);
        if (!requirement) {
            throw new Error('Error: Requirement not found');
        }
        return requirement;
    } catch (error) {
        console.error('Error retrieving requirement:', error);
        throw new Error('Error retrieving requirement');
    }
};


const updateRequirement = async(requirementId, updateData) => {
    try {
        const requirement = await Requirement.findByIdAndUpdate(
            requirementId,
            updateData, { new: true }
        );

        if (!requirement) {
            throw new Error('Error: Requirement not found');
        }

        return requirement;
    } catch (error) {
        console.error('Error updating requirement:', error);
        throw new Error('Error updating requirement');
    }
};


const deleteRequirement = async(requirementId) => {
    const requirement = await Requirement.findById(requirementId);
    if (!requirement) {
        throw new Error('Error: Requirement not found');
    }

    const requirementSet = await RequirementSet.findById(requirement.requirementSetId);
    if (!requirementSet) {
        throw new Error('Error: RequirementSet not found');
    }

    
    requirementSet.requirements.pull(requirementId);
    await requirementSet.save();

    // Now delete the requirement itself
    const deletedRequirement = await Requirement.findByIdAndDelete(requirementId);
    return deletedRequirement;
};


module.exports = {
    createRequirements,
    getRequirements,
    getRequirementById,
    updateRequirement,
    deleteRequirement,
};