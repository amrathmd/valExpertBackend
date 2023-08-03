const express = require('express');
const { requirementSetController } = require('../../controllers');

const router = express.Router();

router
    .route('/')
    .post(requirementSetController.createRequirementSet)
    .get(requirementSetController.getRequirementSets);

router
    .route('/:id')
    .get(requirementSetController.getRequirementSetById)
    .delete(requirementSetController.deleteRequirementSet);

module.exports = router;