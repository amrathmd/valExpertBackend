const express = require('express');
const { requirementsController } = require('../../controllers');
const Requirement = require("../../models/requirements.model");
const router = express.Router();

router.route('/')
    .post(requirementsController.createRequirements)
    .get(requirementsController.getRequirements);

router.route('/:id')
    .get(requirementsController.getRequirementById)
    .put(requirementsController.updateRequirement)
    .delete(requirementsController.deleteRequirement);
    
router.route('/requirementset/:requirementSetId')
    .get(requirementsController.getRequirementsByRequirementSetId);

router.route('/testset/:id')
    .get(requirementsController.getRequirementsByTestsetId);

router.route('/:testscript/:id')
    .get(requirementsController.getRequirementsByTestscriptId)
    
router.route('/:id/update')
    .patch(requirementsController.updateRequirementTetscripts)
    .patch(requirementsController.updateRequirementTetsteps);

module.exports = router;