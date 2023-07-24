const RequirementSet = require('../models/requirementSet.model');
const Requirement = require('../models/requirements.model');

const cascadeProjectDelete = async function(next) {
    const projectId = this._id;

    try {

        await RequirementSet.deleteMany({ projectId });
        await Requirement.deleteMany({ requirementSetId: { $in: this.requirementsets } });


        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { cascadeProjectDelete };