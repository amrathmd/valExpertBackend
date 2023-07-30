const mongoose = require('mongoose');
const { Schema } = mongoose;

const requirementSchema = new mongoose.Schema({
    requirementSetId: {
        type: Schema.Types.ObjectId,
        ref: 'RequirementSet',
        required: true,
    },
    requirementDescription: {
        type: String,
    },
    requirementCategory: {
        type: String,
        required: true,
    },
    verification: {
        type: String,
        enum: ['Testing', 'Procedure', 'Testing and Procedure'],
        required: true
    },
    reference: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const Requirement = mongoose.model('Requirement', requirementSchema);

module.exports = Requirement;