const express = require('express');
const { teststepsController } = require('../../controllers');
const Teststep = require("../../models/teststeps.model");
const router = express.Router();


router
    .route('/')
    .post(teststepsController.createTeststep)
    .get(teststepsController.getTeststeps);
router.route('/:id')
    .get(teststepsController.getTeststepById)
    .delete(teststepController.deleteTeststep);

module.exports = router;