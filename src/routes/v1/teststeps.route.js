const express = require('express');
const { teststepsController } = require('../../controllers');
const router = express.Router();


router
    .route('/')
    .post(teststepsController.createTeststep)
    .get(teststepsController.getTeststeps);
router.route('/:id')
    .get(teststepsController.getTeststepById)
    .delete(teststepsController.deleteTeststep)
    .put(teststepsController.updateTeststep)
router.route('/testcases/:id').get(teststepsController.getTestStepsByTestcaseId)
module.exports = router;