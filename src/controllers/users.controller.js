const { adminusersService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const createAdminUser = catchAsync(async (req, res) => {
  const userData = req.body;

  try {
    const newUser = await adminusersService.createAdminUser(userData);
    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Error creating user." });
  }
});

const getAdminUsers = catchAsync(async (req, res) => {
  const allUsers = await adminusersService.getAdminUsers();
  res.status(200).json({ allUsers });
});

const updateAdminUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const updatedData = req.body;
  const updatedUser = await adminusersService.updateAdminUser(
    userId,
    updatedData
  );
  res.status(200).json({ user: updatedUser });
});
const getAdminUserById = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const user = await adminusersService.getAdminUserById(userId);
  res.status(200).json({ user });
});

const deleteAdminUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  await adminusersService.deleteAdminUser(userId);
  res.status(204).end();
});

const updateAdminPassword = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res
      .status(400)
      .json({ error: "Both currentPassword and newPassword are required." });
  }
  try {
    await adminusersService.updateAdminPassword(
      userId,
      currentPassword,
      newPassword
    );
    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});

module.exports = {
  createAdminUser,
  getAdminUsers,
  getAdminUserById,
  updateAdminUser,
  deleteAdminUser,
  updateAdminPassword,
};
