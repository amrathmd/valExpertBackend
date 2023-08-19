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
    testSetName: {
        type: String,
        required: true
    },
    // requirementSetName: {
    //     type: String,
    //     required: true
    // },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['IQ', 'OQ', 'PQ', 'UAT', 'FAT', 'Integration test', 'Unit tests', 'Smoke test'],
        required: true
    },
    status: {
        type: String,
        enum: ['Draft', 'In Review', 'Ready for execution','Approved'],
        required: true
    },
    testscripts: [{
        type: Schema.Types.ObjectId,
        ref: "Testscript",
        required: true,
    }],
   
},
{
    timestamps: true,
},);


const Test = mongoose.model('Test', testSchema);
module.exports = Test;