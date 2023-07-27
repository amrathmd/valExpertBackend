const mongoose = require('mongoose');
const { Schema } = mongoose;

const testSchema = new mongoose.Schema({
    requirementSetId: {
        type: Schema.Types.ObjectId,
        ref: 'RequirementSet',
        required: true,
    },
    testName: {
        type: String,
        required: true
    },
    requirementSetName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
});


const Test = mongoose.model('Test', testSchema);
module.exports = Test;
