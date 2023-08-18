const mongoose = require('mongoose');
const { Schema } = mongoose;
const confObjectsSchema = new Schema({
    facility: [{
        type: String,
        required: true,
    }],
    department: [{
        type: String,
        required: true,
    }],
    country:[{
        type:String,
        required: true,
    }],
    scope: {
        type: String,
        required: true,
    },
    testsetCategory: {
        type: String,
        required: true,
    },
    requirementCategory: {
        type: String,
        required: true,
    },
    requirementVerification: {
        type: String,
        required: true,
    },
    defectCategory: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const confObject = mongoose.model('confObjects', confObjectsSchema);
module.exports = confObject;