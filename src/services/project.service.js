const Project = require("../models/project.model");

const createProject = async(projectBody) => {
    const { name, department, category, description, implementationDate } = projectBody;

    // Creating a new project instance
    const project = new Project.create({
        name,
        department,
        category,
        description,
        implementationDate,
    });
    if (!project) {
        throw new Error('error something went wrong ');
    }
    return {
        status: true,
        code: 201,
        message: "succes",
        info: project
    }
}

module.export = { createProject }