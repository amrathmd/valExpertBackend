/*const Project = require("../models/project.model");
const RequirementSet = require("../models/requirementSet.model");
const Requirement = require("../models/requirements.model");
const Test = require("../models/testsets.model");
const Testscript = require("../models/testscripts.model");
const Teststep = require("../models/teststeps.model");
const PDFDocument = require('pdfkit');


const createProject = async(projectBody) => {
    const projectStatus = new Project({
        requirementsets: [],
        testsets: [],
        ...projectBody,
    });
    const createdProject = await projectStatus.save();
    return createdProject;
};


const getProjects = async() => {
    const projects = await Project.find().sort({
        'createdAt': -1
    });
    return projects;
}


const getProjectById = async(projectId) => {
    const project = await Project.findById(projectId);
    if (!project) {
        throw new Error('Error: Project not found');
    }
    return project;
};

const deleteProject = async (projectId) => {
    try {
        const project = await Project.findById(projectId).exec();
        if (!project) {
            throw new Error("Error: Project not found");
        }

        const requirementSetIds = project.requirementsets;
        const testsetIds = project.testsets;

        
        const testScripts = await Testscript.find({ testsetId: { $in: testsetIds } }).select('_id').lean().exec();
        const testScriptIds = testScripts.map(script => script._id);

    
        await Promise.all([
            Teststep.deleteMany({ testscriptId: { $in: testScriptIds } }).exec(),
            Testscript.deleteMany({ _id: { $in: testScriptIds } }).exec(),
            Requirement.deleteMany({ requirementSetId: { $in: requirementSetIds } }).exec(),
            Test.deleteMany({ _id: { $in: testsetIds } }).exec(),
            RequirementSet.deleteMany({ _id: { $in: requirementSetIds } }).exec()
        ]);

    
        const deletedProject = await Project.findByIdAndDelete(projectId).exec();

        return deletedProject;
    } catch (error) {
        throw error;
    }
};

const generatePDF = async (projectId) => {
    try {
        const project = await getProjectById(projectId);
        const requirementSets = await RequirementSet.find({
            _id: { $in: project.requirementsets }
        });

        const buffers = await generatePDFBuffer(project, requirementSets);
        return buffers;
    } catch (error) {
        console.error('Error fetching project:', error);
        throw error;
    }
};

async function generatePDFBuffer(project, requirementSets) {
    return new Promise((resolve) => {
        const doc = new PDFDocument();
        doc.image('./src/static/images/logoicon.png', 50, 50, { width: 100 });

        doc.fontSize(24).fillColor('#003059').text('VALEXPERT', { align: 'center', bold: true });
        doc.moveDown();

        doc.fontSize(20).fillColor('#003059').text('Project Details', { align: 'center' });
        doc.moveDown(0.5);
        addText(doc, 'Project Name:', project.projectName);
        addText(doc, 'Purpose:', project.purpose);
        addText(doc, 'Status:', project.status);
        addText(doc, 'Activation Date:', project.activationDate);
        doc.moveDown();

        doc.fontSize(20).fillColor('#003059').text('Requirement Sets', { align: 'center' });
        doc.moveDown(0.5);
        requirementSets.forEach((requirementSet, index) => {
            doc.fontSize(14).fillColor('black').text(`Requirement Set ${index + 1}`);
            addText(doc, 'Name:', requirementSet.name);
            addText(doc, 'Status:', requirementSet.status);
            doc.moveDown();
        });

        const buffers = [];
        doc.on('data', buffer => buffers.push(buffer));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
        doc.end();
    });
}

function addText(doc, label, value) {
    doc.fontSize(12).fillColor('black');
    doc.font('Helvetica-Bold').text(`${label}:`, { continued: true });
    doc.font('Helvetica').text(` ${value}`);
}

module.exports = { createProject, getProjects, getProjectById, deleteProject, generatePDF }
*/


const Project = require("../models/project.model");
const RequirementSet = require("../models/requirementSet.model");
const Requirement = require("../models/requirements.model");
const Test = require("../models/testsets.model");
const Testscript = require("../models/testscripts.model");
const Teststep = require("../models/teststeps.model");
const PDFDocument = require('pdfkit');

const createProject = async (projectBody) => {
  try {
    const projectStatus = new Project({
      requirementsets: [],
      testsets: [],
      ...projectBody,
    });
    const createdProject = await projectStatus.save();
    return createdProject;
  } catch (error) {
    throw new Error('Error creating project');
  }
};

const getProjects = async () => {
  try {
    const projects = await Project.find().sort({
      'createdAt': -1
    });
    return projects;
  } catch (error) {
    throw new Error('Error fetching projects');
  }
};

const getProjectById = async (projectId) => {
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      throw new Error('Error: Project not found');
    }
    return project;
  } catch (error) {
    throw new Error('Error fetching project by ID');
  }
};

const deleteProject = async (projectId) => {
  try {
    const project = await Project.findById(projectId).exec();
    if (!project) {
      throw new Error("Error: Project not found");
    }

    const requirementSetIds = project.requirementsets;
    const testsetIds = project.testsets;

    const testScripts = await Testscript.find({ testsetId: { $in: testsetIds } }).select('_id').lean().exec();
    const testScriptIds = testScripts.map(script => script._id);

    await Promise.all([
      Teststep.deleteMany({ testscriptId: { $in: testScriptIds } }).exec(),
      Testscript.deleteMany({ _id: { $in: testScriptIds } }).exec(),
      Requirement.deleteMany({ requirementSetId: { $in: requirementSetIds } }).exec(),
      Test.deleteMany({ _id: { $in: testsetIds } }).exec(),
      RequirementSet.deleteMany({ _id: { $in: requirementSetIds } }).exec()
    ]);

    const deletedProject = await Project.findByIdAndDelete(projectId).exec();

    return deletedProject;
  } catch (error) {
    throw new Error('Error deleting project');
  }
};

const generatePDF = async (projectId) => {
  try {
    const project = await getProjectById(projectId);
    const requirementSets = await RequirementSet.find({
      _id: { $in: project.requirementsets }
    });

    const buffers = await generatePDFBuffer(project, requirementSets);
    return buffers;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw new Error('Error generating PDF');
  }
};

async function generatePDFBuffer(project, requirementSets) {
  return new Promise((resolve) => {
    const doc = new PDFDocument();
    doc.image('./src/static/images/logoicon.png', 50, 50, { width: 100 });

    doc.fontSize(24).fillColor('#003059').text('VALEXPERT', { align: 'center', bold: true });
    doc.moveDown();

    doc.fontSize(20).fillColor('#003059').text('Project Details', { align: 'center' });
    doc.moveDown(0.5);
    addText(doc, 'Project Name:', project.projectName);
    addText(doc, 'Purpose:', project.purpose);
    addText(doc, 'Status:', project.status);
    addText(doc, 'Activation Date:', project.activationDate);
    doc.moveDown();

    doc.fontSize(20).fillColor('#003059').text('Requirement Sets', { align: 'center' });
    doc.moveDown(0.5);
    requirementSets.forEach((requirementSet, index) => {
      doc.fontSize(14).fillColor('black').text(`Requirement Set ${index + 1}`);
      addText(doc, 'Name:', requirementSet.name);
      addText(doc, 'Status:', requirementSet.status);
      doc.moveDown();
    });

    const buffers = [];
    doc.on('data', buffer => buffers.push(buffer));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.end();
  });
}

function addText(doc, label, value) {
  doc.fontSize(12).fillColor('black');
  doc.font('Helvetica-Bold').text(`${label}:`, { continued: true });
  doc.font('Helvetica').text(` ${value}`);
}

module.exports = { createProject, getProjects, getProjectById, deleteProject, generatePDF };
