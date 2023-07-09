const express = require('express');
const { requirementsController } = require('../../controllers');
const Requirement = require("../../models/requirements.model");
const router = express.Router();

router.route('/')
    .post(requirementsController.createRequirements)
    .get(requirementsController.getRequirements);

module.exports = router;