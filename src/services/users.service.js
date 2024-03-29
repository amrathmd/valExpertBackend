const adminUser = require("../models/users.model");
const bcrypt = require("bcryptjs");
const AWS = require("aws-sdk");
const dotenv = require("dotenv");
const config = require("../config/config");

dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

function generateRandomPassword(length) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

async function sendEmailWithPassword(email, password) {
  const emailParams = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: {
          Data: `Your password is: ${password}\nPlease change it after logging in.`,
        },
      },
      Subject: {
        Data: "Your Account Information",
      },
    },
    Source: "valexpert.us@gmail.com",
  };

  //await ses.sendEmail(emailParams).promise();
  try {
    const result = await ses.sendEmail(emailParams).promise();
    console.log("Email sent successfully:", result);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

const createAdminUser = async (userData) => {
  const { email } = userData;
  try {
    const isEmailTaken = await adminUser.isEmailTaken(email);
    if (isEmailTaken) {
      throw { statusCode: 400, message: "Email is already taken." };
    }
    const randomPassword = generateRandomPassword(6);
    const hashPassword = await bcrypt.hash(randomPassword, config.saltRounds);

    const userData1 = {
      ...userData,
      password: hashPassword,
    };
    const newUser = new adminUser(userData1);

    await newUser.save();
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
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

    const isPasswordCorrect = await user.isPasswordMatch(currentPassword);
    if (!isPasswordCorrect) {
      throw { statusCode: 400, message: "Incorrect current password." };
    }

    const hashedPssword = await bcrypt.hash(newPassword, config.saltRounds);
    const updatedUser = await adminUser.updateOne(
      { _id: userId },
      { $set: { password: hashedPssword } }
    );
    return updatedUser;
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
