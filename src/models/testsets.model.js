/*const mongoose = require('mongoose');


const testSchema = new mongoose.Schema({
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

module.exports = Test;*/


// testsets.model.js
const mongoose = require('mongoose');


const testSchema = new mongoose.Schema({
    testName: {
        type: String,
        required: true,
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    requirementSetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RequirementSet',
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
}, {
    timestamps: true,
});



const Test = mongoose.model('Test', testSchema);

module.exports = Test;