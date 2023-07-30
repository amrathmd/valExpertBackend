const mongoose = require('mongoose');
const { Schema } = mongoose;

const testSchema = new mongoose.Schema({
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        rquired: true,
    },
    requirementSetId: {
        type: Schema.Types.ObjectId,
        ref: 'RequirementSet',
        required: true,
    },
    testName: {
        type: String,
        required: true,
    },
    requirementSetName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    testcases: [{
        type: Schema.Types.ObjectId,
        ref: "Testcase",
        required: true,
    }],
});


const Test = mongoose.model('Test', testSchema);
module.exports = Test;