const { adminUserController } = require('.');
const catchAsync = require('../utils/catchAsync');

// Adding a new user
const addUser = catchAsync(async(req, res) => {
    const newUser = await adminUserController.addUser(req.body);
    res.json(newUser);
});

// Editing an existing user
const editUser = catchAsync(async(req, res) => {
    const { userId } = req.params;
    const updatedUser = await adminUserController.editUser(userId, req.body);
    res.json(updatedUser);
});

// Deleting a user
const deleteUser = catchAsync(async(req, res) => {
    const { userId } = req.params;
    const deletedUser = await adminUserController.deleteUser(userId);
    res.json(deletedUser);
});

const getUsers = catchAsync(async(req, res) => {
    const allUsers = await adminUserController.getUsers();
    res.json(allUsers);
});
module.exports = {
    addUser,
    editUser,
    deleteUser,
    getUsers
};