const adminUser = require("../models/users.model");
const bcrypt = require("bcryptjs");

const createAdminUser = async (userData) => {
  try {
    const { email } = userData;
    const isEmailTaken = await adminUser.isEmailTaken(email);
    if (isEmailTaken) {
      throw { statusCode: 400, message: "Email is already taken." };
    }
    const newUser = new adminUser(userData);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    await newUser.save();
    return newUser;
  } catch (error) {
    throw { statusCode: 500, message: "Error creating user." };
  }
};

const getAdminUsers = async () => {
  try {
    const allUsers = await adminUser.find();
    return allUsers;
  } catch (error) {
    throw { statusCode: 500, message: "Error fetching users." };
  }
};

const updateAdminUser = async (userId, updatedData) => {
  try {
    const updatedUser = await adminUser.findByIdAndUpdate(userId, updatedData, {
      new: true,
      runValidators: true,
    });
    return updatedUser;
  } catch (error) {
    throw { statusCode: 500, message: "Error updating user." };
  }
};

const getAdminUserById = async (userId) => {
  try {
    const user = await adminUser.findById(userId);
    return user;
  } catch (error) {
    throw { statusCode: 404, message: "adminUser not found." };
  }
};

const deleteAdminUser = async (userId) => {
  try {
    await adminUser.findByIdAndDelete(userId);
  } catch (error) {
    throw { statusCode: 500, message: "Error deleting user." };
  }
};

const updateAdminPassword = async (userId, currentPassword, newPassword) => {
  try {
    const user = await adminUser.findById(userId);
    if (!user) {
      throw { statusCode: 404, message: "adminUser not found." };
    }

    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordCorrect) {
      console.log(isPasswordCorrect);
      throw { statusCode: 400, message: "Incorrect current password." };
    }

    user.password = await bcrypt.hash(newPassword, 8);
    await user.save();
  } catch (error) {
    if (error.statusCode) {
      throw error;
    } else {
      throw { statusCode: 500, message: "Error updating password." };
    }
  }
};

module.exports = {
  createAdminUser,
  getAdminUsers,
  getAdminUserById,
  updateAdminUser,
  deleteAdminUser,
  updateAdminPassword,
};
