const express = require('express');
const { testsetsController } = require('../../controllers');
const Test = require("../../models/testsets.model");
const router = express.Router();


router
    .route('/')
    .post(testsetsController.createTestsets)
    .get(testsetsController.getTestsets);
router.route('/:id')
    .get(testsetsController.getTestsetById)
    .delete(testsetsController.deleteTestset);

module.exports = router;