const mongoose = require('mongoose');

const { Schema } = mongoose;

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