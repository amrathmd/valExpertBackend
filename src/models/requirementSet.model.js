const mongoose = require('mongoose');
const { Schema } = mongoose;
const requirementSetSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    requirements: [{
        type: Schema.Types.ObjectId,
        ref: "Requirement",
        required: true,
    }],
}, { timestamps: true });

const RequirementSet = mongoose.model('RequirementSet', requirementSetSchema);

module.exports = RequirementSet;