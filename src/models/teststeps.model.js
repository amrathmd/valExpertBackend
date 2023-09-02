const mongoose = require('mongoose');
const { Schema } = mongoose;

const teststepsSchema = new mongoose.Schema({
    testscriptId: {
        type: Schema.Types.ObjectId,
        ref: 'Testscript',
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
    requirements: [{
        type: Schema.Types.ObjectId,
        ref: "Requirement",
        required: true,
    }],
    bugs: [{
        type: Schema.Types.ObjectId,
        ref: "Bug",
        required: true,
    }],
});


const Teststep = mongoose.model('Teststep', teststepsSchema);
module.exports = Teststep;