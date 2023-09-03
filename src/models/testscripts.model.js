const mongoose = require('mongoose');
const { Schema } = mongoose;

const testscriptSchema = new mongoose.Schema({
    testCaseNumber: {
        type: Number,
        required : true
    },
    testsetId: {
        type: Schema.Types.ObjectId,
        ref: 'Test',
        required: true,
    },
    Type: {
        type: String,
        required:true,
    },
    purpose: {
        type: String,
        required: true,
    },
    acceptanceCriteria: {
        type: String,
        required: true
    },
    prerequisites: {
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
}, {
    timestamps: true
});

const Testscript = mongoose.model('Testscript', testscriptSchema);

module.exports = Testscript;