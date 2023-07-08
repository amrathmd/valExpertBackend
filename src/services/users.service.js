const adminUsers = require('../models/users.model');
const mongoose = require('mongoose');


const addUser = async (userData) => {
    try {
      const userId = mongoose.Types.ObjectId();
      const user = new adminUsers({ ...userData, userId });
      const savedUser = await user.save();
      return savedUser;
    } catch (error) {
      console.log(error);
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
const getUsers = async () => {
    try {
        const allUsers = await adminUsers.find().sort({
            'createdAt': -1
        });
        return allUsers;
    } catch (error) {
        throw new Error('Error retrieving users');
    }
};



module.exports = { addUser, editUser, deleteUser,getUsers };