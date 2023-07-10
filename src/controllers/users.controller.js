const { adminusersService } = require('../services');
const catchAsync = require('../utils/catchAsync');

// Adding a new user
const addUser = catchAsync(async(req, res) => {
    console.log("Hello WOrld");
    const newUser = await adminusersService.addUser(req.body);
    res.json(newUser);
});

// Editing an existing user
const editUser = catchAsync(async(req, res) => {
    const { userId } = req.params;
    const updatedUser = await adminusersService.editUser(userId, req.body);
    res.json(updatedUser);
});

// Deleting a user
const deleteUser = catchAsync(async(req, res) => {
    const { userId } = req.params;
    const deletedUser = await adminusersService.deleteUser(userId);
    res.json(deletedUser);
});

const getUsers = catchAsync(async(req, res) => {
    const allUsers = await adminusersService.getUsers();
    res.json(allUsers);
});

module.exports = {
    addUser,
    editUser,
    deleteUser,
    getUsers
};