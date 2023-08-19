const mongoose = require('mongoose');

const { Schema } = mongoose;

const projectSchema = new Schema({
    projectName: {
        type: String,
        required: true,
    },
    purpose: {
        type: String,
        required: true,
    },
    status:{
        type:String,
        enum: ['Active', 'Inactive'],
        required:true
    },
    activationDate: {
        type: Date,
        required: true
    },
    inactivationDate: {
        type: Date,
        required: true
    },
    facility:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    scope:[{
        type:String,
        required:true
    }],
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    estimationDate: {
        type: Date,
        required: true,
    },
    applicationName: {
        type: String,
    },
    // applicationVersion: {
    //     type: Number,
    // },
    // changeControlNumber: {
    //     type: Number,
    // },
    // changeControl: {

    // },
    owner: {
        type: String,
        required: true,
    },
    requirementsets: [{
        type: Schema.Types.ObjectId,
        ref: "RequirementSet",
        required: true,
    }],
    testsets: [{
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    }],
}, {
    timestamps: true
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;