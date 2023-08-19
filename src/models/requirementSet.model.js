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
    },
    status: {
        type: String,
        enum: ['Draft', 'In Review', 'Approved'],
        required: true,
    },
    testsetId:{
            type:Schema.Types.ObjectId,
            ref:'Test',
    },
    // version: {

    // },
    requirements: [{
        type: Schema.Types.ObjectId,
        ref: "Requirement",
        
    }],
}, { timestamps: true });

const RequirementSet = mongoose.model('RequirementSet', requirementSetSchema);

module.exports = RequirementSet;