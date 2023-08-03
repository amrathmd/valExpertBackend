const express = require('express');
const { adminUserController } = require('../../controllers');
const router = express.Router();

router
  .route('/')
  .post(adminUserController.createAdminUser)
  .get(adminUserController.getAdminUsers);

router
  .route('/:userId')
  .put(adminUserController.updateAdminUser)
  .get(adminUserController.getAdminUserById)
  .delete(adminUserController.deleteAdminUser);


router.patch('/:userId/update-password', adminUserController.updateAdminPassword);

module.exports = router;
