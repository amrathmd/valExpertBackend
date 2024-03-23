const mongoose = require('mongoose');
const { Schema } = mongoose;

const bugSchema = new mongoose.Schema({
    run: [{
        type: Schema.Types.ObjectId,
        ref: "Run",
        required: true,
    }],
    testscripts: [{
        type: Schema.Types.ObjectId,
        ref: "Testscript",
        required: true,
    }],
    teststeps: [{
        type: Schema.Types.ObjectId,
        ref: "Teststep",
        required: true,
    }],
    number: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    testscriptNumber: {
        type: Number,
        required: true,
    },
    investigation: {
        type: String,
        required: true,
    },
    rootCause: {
        type: String,
        required: true,
    },
    actionTaken: {
        type: String,
        required: true,
    },
    impact: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Open', 'WIP', 'Closed', 'Cancelled'] ,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    assignedDate: {
        type: Date,
        required: true,
    },
},
    {
        timestamps: true,
    }

);



const Bug = mongoose.model('Bug', bugSchema);
module.exports = Bug;