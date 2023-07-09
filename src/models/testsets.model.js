const mongoose = require('mongoose');


const testSchema = new mongoose.Schema({
    testName: {
        type: String,
        required: true
    },
    requirementSetName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
});


const Test = mongoose.model('Test', testSchema);

module.exports = Test;