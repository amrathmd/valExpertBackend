const adminUsers = require('../models/users.model');

const addUser = async(userData) => {
    try {
        const user = new adminUsers(userData);
        const savedUser = await user.save();
        return savedUser;
    } catch (error) {
        throw new Error('Error saving user');
    }
};

const editUser = async(userId, updatedUserData) => {
    try {
        const updatedUser = await adminUsers.updateOne({ userId }, {
            $set: { updatedUserData },
        });
        return updatedUser;
    } catch (error) {
        throw new Error('Error updating user');
    }
};

const deleteUser = async(userId) => {
    try {
        const deletedUser = await adminUsers.deleteOne({ userId });
        return deletedUser;
    } catch (error) {
        throw new Error('Error deleting user');
    }
};

const getUsers = async() => {
    const getusers = await adminUsers.find().sort({
        'createdAt': -1
    });
    return getusers;
}

module.exports = { addUser, editUser, deleteUser };