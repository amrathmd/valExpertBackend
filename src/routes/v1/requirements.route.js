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

router.route('/testset/:testsetId')
    .get(requirementsController.getRequirementsByTestsetId);

router.route('/testscript/:testscriptId')
    .get(requirementsController.getRequirementsByTestscriptId)
    
router.route('/updateTestscripts/:id')
    .patch(requirementsController.updateRequirementTetscripts);
router.route('/updateTeststeps/:id')
    .patch(requirementsController.updateRequirementTetsteps);

router.route('/project/:projectId')
    .get(requirementsController.getRequirementsByProjectId);

module.exports = router;