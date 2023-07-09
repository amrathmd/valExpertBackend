const mongoose = require('mongoose');

const RequirementSetSchema = new mongoose.Schema({
    name : {
      type: String,
      required: true
    },
    projectId: {
      type: String,
      required: true
    },
    requirements:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:'RequirementModel' 
      },
    ],
    testSets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:'testsets'
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
  verification : {
    enum : ['Testing','Procedure','Testing and Procedure'],
  },
  reference:{
    type: String,
    required: true
  }
});

const RequirementSet = new mongoose.model('Requirementset',RequirementSetSchema);
const Requirement = new mongoose.model('Requirement',RequirementSchema);

module.exports={
RequirementSet,
  Requirement
}