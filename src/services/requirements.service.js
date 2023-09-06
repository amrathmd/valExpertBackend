const mongoose = require('mongoose');
const Requirement = require('../models/requirements.model');
const RequirementSet = require('../models/requirementSet.model');
const Teststep = require('../models/teststeps.model');
const Project = require('../models/project.model');
const Testscript = require('../models/testscripts.model');

const createRequirements = async(requirementBody) => {
    try {
        
        const { requirementSetId, ...rest } = requirementBody;

        const requirementSet = await RequirementSet.findOne({ _id: requirementSetId });

        if (!requirementSet) {
            throw new Error('RequirementSet not found');
        }

        const requirement = new Requirement({
            requirementSetId: requirementSet._id,
            testscripts: [],
            teststeps: [],
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


const getRequirementsByProjectId = async (projectId) => {
  try {
    console.log('Fetching requirements by project ID for projectId:', projectId);
    const project = await Project.findById(projectId);
    if (!project) {
      throw new Error('Project not found');
    }
    const requirementSets = await RequirementSet.find({ projectId });
    const requirementSetIds = requirementSets.map((reqSet) => reqSet._id);
    const requirements = await Requirement.find({ requirementSetId: { $in: requirementSetIds } });
    console.log('Requirements fetched successfully:', requirements);
    console.log('Function getRequirementsByProjectId completed successfully.');
    return requirements;
  } catch (error) {
    console.error('Error fetching requirements by project ID:', error);
    throw new Error('Error fetching requirements by project ID');
  }
};


const getRequirementsByRequirementSetId = async (requirementSetId) => {
    try {
        const requirements = await Requirement.find({ requirementSetId }); 
        if (!requirements) {
            throw new Error('Error: Requirementdetails not found');
        }
        console.log(requirements);
        return requirements;
    } catch (error) {
        console.error('Error retrieving requirement details:', error);
        throw new Error('Error retrieving requirement details');
    }
};
const getRequirementsByTestsetId = async (testsetId) => {
  try {
    console.log('Fetching requirements for testsetId:', testsetId);

    // Find the requirementSet associated with the provided testsetId
    const requirementSet = await RequirementSet.findOne({ testsetId }).exec();

    if (!requirementSet) {
      throw new Error('Requirementset not found for the given TestsetId');
    }

    // Get the array of requirement IDs from the requirementSet
    const requirementIds = requirementSet.requirements;

    // Fetch all the requirement objects using the IDs
    const requirements = await Requirement.find({ _id: { $in: requirementIds } }).exec();

    console.log('Fetched requirements:', requirements);

    return requirements;
  } catch (error) {
    console.error('Error fetching requirements by TestsetId:', error);
    throw new Error('Error fetching requirements by TestsetId');
  }
};

  
const getRequirementsByTestscriptId = async (testscriptId) => {
    try {
      const testscript = await Testscript.findOne({ _id: testscriptId }).exec();
      if (!testscript) {
        throw new Error('Testscript not found for the given TestscriptId');
      }
      const requirements = await Requirement.find({ _id: { $in: testscript.requirements } }).exec();
      return requirements;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching requirements by TestscriptId');
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



/*const deleteRequirement = async (requirementId) => {
    try {
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


        await Teststep.updateMany(
            { requirementId: requirementId },
            { $pull: { requirementId: requirementId } }
        );


        const deletedRequirement = await Requirement.findByIdAndDelete(requirementId);

        return deletedRequirement;
    } catch (error) {
        throw error;
    }
};
*/
const deleteRequirement = async (requirementId) => {
  try {
    const requirement = await Requirement.findById(requirementId);
    if (!requirement) {
      throw new Error('Error: Requirement not found');
    }

    const requirementSetId = requirement.requirementSetId;

    // Find the associated Test Set for the Requirement Set
    const testSet = await Test.findOne({ requirementSetId });
    
    // If the Test Set is not found, simply delete the Requirement
    if (!testSet) {
      const deletedRequirement = await Requirement.findByIdAndDelete(
        requirementId
      );
      return deletedRequirement;
    }
    // Update Requirement Set to remove the deleted Requirement ID
    const updatedRequirementSet = await RequirementSet.findByIdAndUpdate(
      requirementSetId,
      {
        $pull: { requirements: requirementId },
      }
    );
    if (!updatedRequirementSet) {
      throw new Error('Error: RequirementSet not found');
    }
    // Update Test Scripts in the Test Set to remove the deleted Requirement ID
    const updatedTestScripts = await Testscript.updateMany(
      { _id: { $in: testSet.testscripts }, requirements: requirementId },
      { $pull: { requirements: requirementId } }
    );
    // Update Test Steps in the Test Set to remove the deleted Requirement ID
    const updatedTestSteps = await Teststep.updateMany(
      { _id: { $in: Testscript.teststeps }, requirements: requirementId },
      { $pull: { requirements: requirementId } }
    );
    // Delete the Requirement
    const deletedRequirement = await Requirement.findByIdAndDelete(
      requirementId
    );
    return deletedRequirement;
  } catch (error) {
    throw error;
  }
};


const updateRequirementTetscripts = async (requirementId, testscripts) => {
    try {
        const existingRequirements = await Requirement.findById(requirementId);
    
        if (!existingRequirements) {
          throw new Error('Requirement not found');
        }
    
        existingRequirements.testscripts = [
          ...existingRequirements.testscripts,
          ...testscripts,
        ];
    
        const updatedRequirement = await existingRequirements.save();
    
        return updatedRequirement;
      } catch (error) {
        console.error(error);
        throw new Error('Error updating requirements');
      }
}

const updateRequirementTetsteps = async (requirementId, teststeps) => {
    try {
      console.log('Received teststeps:', teststeps);

        const existingRequirements = await Requirement.findById(requirementId);
    
        if (!existingRequirements) {
          throw new Error('Requirement not found');
        }
    
        existingRequirements.teststeps = [
          ...existingRequirements.teststeps,
          ...teststeps,
        ];
    
        const updatedRequirement = await existingRequirements.save();
    
        return updatedRequirement;
      } catch (error) {
        console.log(error);
        throw new Error('Error updating requirements');
      }
}

module.exports = {
    createRequirements,
    getRequirements,
    getRequirementById,
    updateRequirement,
    deleteRequirement,
    getRequirementsByRequirementSetId,
    getRequirementsByTestsetId,
    getRequirementsByTestscriptId,
    updateRequirementTetscripts,
    updateRequirementTetsteps,
    getRequirementsByProjectId
};