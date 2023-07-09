const mongoose = require('mongoose');

const { Schema } = mongoose;

const requirementSetSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    requirements: [{
        type: Schema.Types.ObjectId,
        ref: 'Requirement',
    }],
}, {
    timestamps: true,
});

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    implementationDate: {
        type: Date,
        required: true,
    },
    requirementSets: [{
        type: Schema.Types.ObjectId,
        ref: 'RequirementSet',
    }],
}, {
    timestamps: true,
});

const RequirementSet = mongoose.model('RequirementSet', requirementSetSchema);
const Project = mongoose.model('Project', projectSchema);

module.exports = { RequirementSet, Project };