const mongoose = require('mongoose');

const RequirementSetSchema = new mongoose.Schema({
    name : {
      type: String,
      required: type
    },
    projectId: {
      type: String,
      required: true
    },
    requirements:[
      {
        type: mongoose.Schema.Types.ObjectId,
      }
    ],
    testSets: [
      {
        type: mongoose.Schema.Types.ObjectId,
      }
    ]
});
const RequirementSchema = new mongoose.Schema({
  requirementSetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  requirementDescription: {
    type: String
  },
  requirementCategory : {
    type: String,
    required: true
  },
  Verification : {
    enum : ['Testing','Procedure','Testing and Procedure'],
    required: true
  },
  reference:{
    type: String,
    required: true
  }
});

const RequirementSetModel = new mongoose.model('Requirementset',RequirementSetSchema);
const RequirementModel = new mongoose.model('Requirement',RequirementSchema);

module.export={
  RequirementSetModel,
  RequirementModel
}