// Import required modules and models
const Teststep = require('../models/teststeps.model');
const Testcase = require('../models/testcases.model');
const Test = require('../models/testsets.model');
const RequirementSet = require('../models/requirementSet.model');
const Requirement = require('../models/requirements.model');

async function createTeststep(testcaseId, stepNumber, description, expectedResult, requirementIds) {
  try {

    const teststep = new Teststep({
      testcaseId,
      stepNumber,
      description,
      expectedResult,
      requirementId: requirementIds,
    });

    
    await teststep.save();

    
    await Testcase.updateOne(
      { _id: testcaseId },
      { $push: { teststeps: teststep._id } }
    );

    
    const testcase = await Testcase.findById(testcaseId).populate({
      path: 'testsetId',
      populate: {
        path: 'requirementSetId',
        populate: {
          path: 'requirements',
        },
      },
    });

    const testset = await Testset.findById(testcase.testsetId);

    const requirementSet = await RequirementSet.findById(testset.requirementSetId);

    const allRequirements = [
      ...requirementSet.requirements,
    ];

    const filteredRequirements = requirementIds.filter((reqId) =>
      allRequirements.some((req) => req._id.equals(reqId))
    );

    await Teststep.updateOne(
      { _id: teststep._id },
      { $set: { requirementId: filteredRequirements } }
    );

    return teststep;
  } catch (error) {
    console.error('Error creating Teststep:', error);
    throw error;
  }
}

module.exports = { createTeststep };
