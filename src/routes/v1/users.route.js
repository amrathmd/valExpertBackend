const express = require('express');
const { adminUserController } = require('../../controllers');
const router = express.Router();


router
    .route('/')
    .post(adminUserController.addUser)
    .get(adminUserController.getUsers);


router
    .route('/:userId')
    .put(adminUserController.editUser)
    .delete(adminUserController.deleteUser);

module.exports = router;