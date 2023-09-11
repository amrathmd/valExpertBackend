/*const mongoose = require('mongoose');
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

const deleteRequirement = async (requirementId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const requirement = await Requirement.findById(requirementId).session(session);
    if (!requirement) {
      throw new Error('Requirement not found');
    }

    const requirementSetId = requirement.requirementSetId;

    const testSet = await Test.findOne({ requirementSetId }).session(session);

    // Update Testscripts to remove the requirementId under the specific Testset
    if (testSet) {
      await Testscript.updateMany(
        { testsetId: testSet._id, requirements: requirementId },
        { $pull: { requirements: requirementId } }
      ).session(session);
    }

    // Update Teststeps to remove the requirementId under the specific Testscripts
    await Teststep.updateMany(
      { testscriptId: { $in: requirement.testscripts }, requirements: requirementId },
      { $pull: { requirements: requirementId } }
    ).session(session);

    // Update RequirementSet by removing the requirementId
    await RequirementSet.findByIdAndUpdate(
      requirementSetId,
      { $pull: { requirements: requirementId } }
    ).session(session);

    // Delete the Requirement
    await Requirement.findByIdAndDelete(requirementId).session(session);

    await session.commitTransaction();
    session.endSession();

    return { message: 'Requirement and associated references deleted' };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
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
*/


const mongoose = require('mongoose');
const Requirement = require('../models/requirements.model');
const RequirementSet = require('../models/requirementSet.model');
const Teststep = require('../models/teststeps.model');
const Project = require('../models/project.model');
const Testscript = require('../models/testscripts.model');
const Redis = require('ioredis'); 
const redisClient = require('../utils/redis'); 


const createRequirements = async (requirementBody) => {
  let session;
  try {
    // Start a MongoDB transaction
    session = await mongoose.startSession();
    session.startTransaction();

    const { requirementSetId, ...rest } = requirementBody;

    // Acquire a lock on the RequirementSet document
    const requirementSet = await RequirementSet.findOne({ _id: requirementSetId }).session(session).select('+requirements');

    if (!requirementSet) {
      throw new Error('RequirementSet not found');
    }

    // Create the Requirement document
    const requirement = new Requirement({
      requirementSetId: requirementSet._id,
      testscripts: [],
      teststeps: [],
      ...rest,
    });

    const savedRequirement = await requirement.save();

    // Update the RequirementSet by adding the new Requirement ID
    requirementSet.requirements.push(savedRequirement._id);
    await requirementSet.save();

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Invalidate the cache for all requirements
    await redisClient.del('allRequirements');

    return savedRequirement;
  } catch (error) {
    // Rollback the transaction in case of an error
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    console.log(error);
    throw new Error('Error saving requirement');
  }
};


const getRequirements = async () => {
  try {
    // Check if the data is already in cache
    const cachedRequirements = await redisClient.get('allRequirements');

    if (cachedRequirements) {
      console.log('Fetching requirements from cache');
      return JSON.parse(cachedRequirements);
    }

    const allRequirements = await Requirement.find().sort({ createdAt: -1 });

    // Cache the data for future use
    await redisClient.set('allRequirements', JSON.stringify(allRequirements));

    return allRequirements;
  } catch (error) {
    throw new Error('Error retrieving requirements');
  }
};

const getRequirementById = async (requirementId) => {
  try {
    // Check if the data is already in cache
    const cachedRequirement = await redisClient.get(`requirement:${requirementId}`);

    if (cachedRequirement) {
      console.log(`Fetching requirement ${requirementId} from cache`);
      return JSON.parse(cachedRequirement);
    }

    const requirement = await Requirement.findById(requirementId);
    if (!requirement) {
      throw new Error('Error: Requirement not found');
    }

    // Cache the data for future use
    await redisClient.set(`requirement:${requirementId}`, JSON.stringify(requirement));

    return requirement;
  } catch (error) {
    console.error('Error retrieving requirement:', error);
    throw new Error('Error retrieving requirement');
  }
};

const getRequirementsByProjectId = async (projectId) => {
  try {
    console.log('Fetching requirements by project ID for projectId:', projectId);

    // Check if the data is already in cache
    const cachedRequirements = await redisClient.get(`requirementsByProject:${projectId}`);

    if (cachedRequirements) {
      console.log('Fetching requirements by project ID from cache');
      return JSON.parse(cachedRequirements);
    }

    const project = await Project.findById(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    const requirementSets = await RequirementSet.find({ projectId });
    const requirementSetIds = requirementSets.map((reqSet) => reqSet._id);
    const requirements = await Requirement.find({ requirementSetId: { $in: requirementSetIds } });
    console.log('Requirements fetched successfully:', requirements);
    console.log('Function getRequirementsByProjectId completed successfully.');

    // Cache the data for future use
    await redisClient.set(`requirementsByProject:${projectId}`, JSON.stringify(requirements));

    return requirements;
  } catch (error) {
    console.error('Error fetching requirements by project ID:', error);
    throw new Error('Error fetching requirements by project ID');
  }
};

const getRequirementsByRequirementSetId = async (requirementSetId) => {
  try {
    // Check if the data is already in cache
    const cachedRequirements = await redisClient.get(`requirementsByRequirementSet:${requirementSetId}`);

    if (cachedRequirements) {
      console.log(`Fetching requirements by requirementSetId ${requirementSetId} from cache`);
      return JSON.parse(cachedRequirements);
    }

    const requirements = await Requirement.find({ requirementSetId });
    if (!requirements) {
      throw new Error('Error: Requirementdetails not found');
    }
    console.log(requirements);

    // Cache the data for future use
    await redisClient.set(`requirementsByRequirementSet:${requirementSetId}`, JSON.stringify(requirements));

    return requirements;
  } catch (error) {
    console.error('Error retrieving requirement details:', error);
    throw new Error('Error retrieving requirement details');
  }
};

const getRequirementsByTestsetId = async (testsetId) => {
  try {
    console.log('Fetching requirements for testsetId:', testsetId);

    // Check if the data is already in cache
    const cachedRequirements = await redisClient.get(`requirementsByTestset:${testsetId}`);

    if (cachedRequirements) {
      console.log(`Fetching requirements by testsetId ${testsetId} from cache`);
      return JSON.parse(cachedRequirements);
    }

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

    // Cache the data for future use
    await redisClient.set(`requirementsByTestset:${testsetId}`, JSON.stringify(requirements));

    return requirements;
  } catch (error) {
    console.error('Error fetching requirements by TestsetId:', error);
    throw new Error('Error fetching requirements by TestsetId');
  }
};

const getRequirementsByTestscriptId = async (testscriptId) => {
  try {
    // Check if the data is already in cache
    const cachedRequirements = await redisClient.get(`requirementsByTestscript:${testscriptId}`);

    if (cachedRequirements) {
      console.log(`Fetching requirements by testscriptId ${testscriptId} from cache`);
      return JSON.parse(cachedRequirements);
    }

    const testscript = await Testscript.findOne({ _id: testscriptId }).exec();
    if (!testscript) {
      throw new Error('Testscript not found for the given TestscriptId');
    }
    const requirements = await Requirement.find({ _id: { $in: testscript.requirements } }).exec();

    // Cache the data for future use
    await redisClient.set(`requirementsByTestscript:${testscriptId}`, JSON.stringify(requirements));

    return requirements;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching requirements by TestscriptId');
  }
};

const updateRequirement = async (requirementId, updateData) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const requirement = await Requirement.findByIdAndUpdate(
      requirementId,
      updateData,
      { new: true, session }
    );

    if (!requirement) {
      throw new Error('Error: Requirement not found');
    }

    await session.commitTransaction();
    session.endSession();

    // Invalidate the cache for all requirements
    await redisClient.del('allRequirements');

    // Also invalidate the cache for this specific requirement
    await redisClient.del(`requirement:${requirementId}`);

    return requirement;
  } catch (error) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    console.error('Error updating requirement:', error);
    throw new Error('Error updating requirement');
  }
};

const deleteRequirement = async (requirementId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const requirement = await Requirement.findById(requirementId).session(session);
    if (!requirement) {
      throw new Error('Requirement not found');
    }

    const requirementSetId = requirement.requirementSetId;

    const testSet = await Test.findOne({ requirementSetId }).session(session);

    // Update Testscripts to remove the requirementId under the specific Testset
    if (testSet) {
      await Testscript.updateMany(
        { testsetId: testSet._id, requirements: requirementId },
        { $pull: { requirements: requirementId } }
      ).session(session);
    }

    // Update Teststeps to remove the requirementId under the specific Testscripts
    await Teststep.updateMany(
      { testscriptId: { $in: requirement.testscripts }, requirements: requirementId },
      { $pull: { requirements: requirementId } }
    ).session(session);

    // Update RequirementSet by removing the requirementId
    await RequirementSet.findByIdAndUpdate(
      requirementSetId,
      { $pull: { requirements: requirementId } }
    ).session(session);

    // Delete the Requirement
    await Requirement.findByIdAndDelete(requirementId).session(session);

    await session.commitTransaction();
    session.endSession();

    // Invalidate the cache for all requirements
    await redisClient.del('allRequirements');

    // Also invalidate the cache for this specific requirement
    await redisClient.del(`requirement:${requirementId}`);

    return { message: 'Requirement and associated references deleted' };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const updateRequirementTetscripts = async (requirementId, testscripts) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const existingRequirements = await Requirement.findById(requirementId).session(session);

    if (!existingRequirements) {
      throw new Error('Requirement not found');
    }

    existingRequirements.testscripts = [
      ...existingRequirements.testscripts,
      ...testscripts,
    ];

    const updatedRequirement = await existingRequirements.save();

    await session.commitTransaction();
    session.endSession();

    // Invalidate the cache for all requirements
    await redisClient.del('allRequirements');

    // Also invalidate the cache for this specific requirement
    await redisClient.del(`requirement:${requirementId}`);

    return updatedRequirement;
  } catch (error) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    console.error(error);
    throw new Error('Error updating requirements');
  }
};

const updateRequirementTetsteps = async (requirementId, teststeps) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    console.log('Received teststeps:', teststeps);

    const existingRequirements = await Requirement.findById(requirementId).session(session);

    if (!existingRequirements) {
      throw new  Error('Requirement not found');
    }

    existingRequirements.teststeps = [
      ...existingRequirements.teststeps,
      ...teststeps,
    ];

    const updatedRequirement = await existingRequirements.save();

    await session.commitTransaction();
    session.endSession();

    // Invalidate the cache for all requirements
    await redisClient.del('allRequirements');

    // Also invalidate the cache for this specific requirement
    await redisClient.del(`requirement:${requirementId}`);

    return updatedRequirement;
  } catch (error) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    console.log(error);
    throw new Error('Error updating requirements');
  }
};

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
  getRequirementsByProjectId,
};
