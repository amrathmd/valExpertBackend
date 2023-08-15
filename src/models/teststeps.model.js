const mongoose = require('mongoose');
const { Schema } = mongoose;

const teststepsSchema = new mongoose.Schema({
    testcaseId: {
        type: Schema.Types.ObjectId,
        ref: 'Testcase',
        required: true,
    },
    stepNumber: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    expectedResult: {
        type: String,
        required: true,
    },
    requirementId: [{
        type: Schema.Types.ObjectId,
        ref: "Requirement",
        required: true,
    }],
});


const Teststep = mongoose.model('Teststep', teststepsSchema);
module.exports = Teststep;