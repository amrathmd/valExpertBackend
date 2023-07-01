const Project = require("../models/project.model");

const createProject = async(projectBody) => {
    const { project } = projectBody;
    console.log("Came");

    // Creating a new project instance
    const projectStatus = await Project.create(project);
    if (!projectStatus) {
        console.log("status");
        throw new Error('error something went wrong ');
    }
    console.log("p", projectStatus);
    return projectStatus;
}
const getProjects = async() => {
    const projects = await Project.find().sort({
        'createdAt': -1
    });
    return projects;
}

module.exports = { createProject, getProjects }