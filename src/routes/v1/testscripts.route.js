const express = require('express');
const { testscriptsController } = require('../../controllers');
const router = express.Router();

router.route('/')
    .post(testscriptsController.createTestscript)
    .get(testscriptsController.getTestscripts);
router.route('/:id')
    .get(testscriptsController.getTestscriptById)
    .put(testscriptsController.updateTestscript)
    .delete(testscriptsController.deleteTestscript)
    .patch(testscriptsController.updateRequirements);
router.route('/testset/:id')
    .get(testscriptsController.getTestscriptByTestSetId);
router.route('/requirements/:id')
    .get(testscriptsController.getTestscriptsByRequirement);
router.route('/:id/update')
    .get(testscriptsController.updateTestscriptRequirement);
module.exports = router;