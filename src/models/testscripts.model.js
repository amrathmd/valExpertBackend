const mongoose = require('mongoose');
const { Schema } = mongoose;

const testscriptSchema = new mongoose.Schema({
    testsetId: {
        type: Schema.Types.ObjectId,
        ref: 'Test',
        required: true,
    },
    Type: {
        type: String,
        required:true,
    },
    number: {
        type: Number,
        required: true,
    },
    purpose: {
        type: String,
        required: true,
    },
    acceptanceCriteria: {
        type: String,
        required: true
    },
    prerequesites: {
        type: String,
        required: true,
    },
    result:{
        type: String,
        enum: ['pass', 'fail', 'not started', 'in progress', 'cancelled'],
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    teststeps: [{
        type: Schema.Types.ObjectId,
        ref: "Teststep",
        required: true,
    }],
    requirements: [{
        type: Schema.Types.ObjectId,
        ref: "Requirement",
        required: true,
    }],
    run: [{
        type: Schema.Types.ObjectId,
        ref: "Run",
        required: true,
    }],
    bugs: [{
        type: Schema.Types.ObjectId,
        ref: "Bug",
        required: true,
    }]
}, {
    timestamps: true
});

const Testscript = mongoose.model('Testscript', testscriptSchema);

module.exports = Testscript;