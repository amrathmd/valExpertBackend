const express = require('express');
const { testsetsController } = require('../../controllers');
const Test = require("../../models/testsets.model");
const router = express.Router();


router
    .route('/')
    .post(testsetsController.createTestsets)
    .get(testsetsController.getTestsets)


module.exports = router;