const mongoose = require('mongoose');
const { Schema } = mongoose;

const testcaseSchema = new mongoose.Schema({
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
    prerequesites: {
        type: String,
        required: true,
    },
    result:{
        type: String,
        enum: ['Pass', 'Fail', 'Not Started', 'In Progress', 'Cancelled'],
        required: true,
    },
    author: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const Testcase = mongoose.model('Testcase', testcaseSchema);

module.exports = Testcase;