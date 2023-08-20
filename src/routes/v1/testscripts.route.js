const express = require('express');
const { testscriptsController } = require('../../controllers');
const router = express.Router();

router.route('/')
    .post(testscriptsController.createTestscript)
    .get(testscriptsController.getTestscripts);
router.route('/:id')
    .get(testscriptsController.getTestscriptById)
    .put(testscriptsController.updateTestscript)
    .delete(testscriptsController.deleteTestscript);
router.route('/testset/:id')
    .get(testscriptsController.getTestscriptByTestSetId);

module.exports = router;