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

module.exports = router;