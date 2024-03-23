const mongoose = require('mongoose');
const { Schema } = mongoose;

const runSchema = new mongoose.Schema({
    testscriptId: [{
        type: Schema.Types.ObjectId,
        ref: 'Testscript',
        required: true,
    }],
    description: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    expectedResult: {
        type: String,
        required: true,
    },
    actualResult: {
        type: String,
        required: true,
    },
    testscripttNumber: {
        type: String,
        required: true,
    },
    purpose: {
        type: String,
        required: true,
    },
    requirements: [{
        type: Schema.Types.ObjectId,
        ref: "Requirement",
        required: true,
    }],
    acceptanceCriteria: {
        type: String,
        required: true,
    },
    prerequisites: {
        type: String,
        required: true,
    },
    teststepResult: [{
        type: String,
        enum: ['Pass', 'Fail', 'N/A'],
        required: true,
    }],
    testscripts : [{
        type: String,
        ref: 'Typescript',
        required: true,
    }],
    bugs: [{
        type: String,
        ref: 'Bug',
        required: true,
    }]
});



const Run = mongoose.model('Run', runSchema);
module.exports = Run;