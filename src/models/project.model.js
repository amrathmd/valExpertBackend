const { string } = require('joi');
const mongoose = require('mongoose');

const { Schema } = mongoose;
const projectSchema = new Schema({
    projectName: {
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
    country:{
        type:String,
        required:true
    },
    description: {
        type: String,
        required: true,
    },
    facility:{
        type:String,
        required:true
    },
    scope:{
        type:String,
        required:true
    },
    // estimationDate: {
    //     type: Date,
    //     required: true,
    // },
    status:{
        type:String,
        required:true
    },
    requirementsets : [
        {
            type : mongoose.Schema.Types.ObjectId,
        },
    ]
    });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;