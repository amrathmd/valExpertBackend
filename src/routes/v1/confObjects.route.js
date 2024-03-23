const express = require('express');
const { confObjectsController  } = require('../../controllers');
const router = express.Router();

router.route('/')
    .post(confObjectsController.createConfObjects)
    .get(confObjectsController.getConfObjects)
    .delete(confObjectsController.deleteAllConfObjects);
router.route('/:id')
    .get(confObjectsController.getConfObjectsById)
    .put(confObjectsController.updateConfObject)
    .delete(confObjectsController.deleteConfObject);

module.exports = router;