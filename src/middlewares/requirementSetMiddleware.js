const Requirement = require('../models/requirements.model');
const Project = require('../models/project.model');

const cascadeRequirementSetDelete = async function(next) {
    const requirementSetId = this._id;

    try {
        await Requirement.deleteMany({ requirementSetId });
        await Project.updateMany({ requirementsets: requirementSetId }, { $pull: { requirementsets: requirementSetId } });
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { cascadeRequirementSetDelete };