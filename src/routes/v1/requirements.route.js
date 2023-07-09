const express = require('express');
const { requirementsController } = require('../../controllers');
const RequirementModel = require("../../models/testsets.model");
const router = express.Router();


router
    .route('/')
    .post(requirementsController.createRequirements)
    .get(requirementsController.getRequirements)


module.exports = router;