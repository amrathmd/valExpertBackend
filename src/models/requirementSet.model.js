const mongoose = require('mongoose');
const { Schema } = mongoose;
const { incrementVersion } = require("../utils/versionUtils");
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
     version: {
        type: String,
        required: true,
     },
    requirements: [{
        type: Schema.Types.ObjectId,
        ref: "Requirement",
        
    }],
}, { timestamps: true });


requirementSetSchema.pre("save", function (next) {
    if (this.isNew) {
        this.version = incrementVersion(this.version);
    }
    next();
});

const RequirementSet = mongoose.model('RequirementSet', requirementSetSchema);

module.exports = RequirementSet;