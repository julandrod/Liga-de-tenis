const { tryCatchWrapper, endpointResponse } = require("../helpers");
const userServices = require("../services/users.services");

const getAllUsers = tryCatchWrapper(async (req, res, next) => {
  const { query, page } = req.query;
  const users = await userServices.findAllUsers({
    role: req.user.role,
    query,
    pageNumber: page,
  });

  endpointResponse({ res, message: "Users listed successfully", body: users });
});

const getUserById = tryCatchWrapper(async (req, res, next) => {
  const { userId } = req.params;
  const user = await userServices.findSingleUser({ userId });

  endpointResponse({ res, message: "User found successfully", body: { user } });
});

const putUserById = tryCatchWrapper(async (req, res, next) => {
  const { userId } = req.params;
  const { name, lastName, age, gender, email } = req.body;
  await userServices.findSingleUser({ userId });
  const userUpdated = await userServices.findAndUpdateUser({
    userId,
    reqUser: req.user,
    name,
    lastName,
    age,
    gender,
    email,
  });

  endpointResponse({
    res,
    message: "User updated successfully",
    body: { user: userUpdated },
  });
});

const deleteUserById = tryCatchWrapper(async (req, res, next) => {
  const { userId } = req.params;
  await userServices.findSingleUser({ userId });
  const user = await userServices.findAndDeleteUser({
    userId,
    reqUser: req.user,
  });

  endpointResponse({
    res,
    message: "User deleted successfully",
    body: { user },
  });
});

const putUserPassword = tryCatchWrapper(async (req, res, next) => {
  const { userId } = req.params;
  const { oldPassword, newPassword } = req.body;
  await userServices.findSingleUser({ userId });
  const userUpdated = await userServices.resetPassword({
    userId,
    reqUser: req.user,
    oldPassword,
    newPassword,
  });

  endpointResponse({
    res,
    message: "Password updated successfully",
    body: { user: userUpdated },
  });
});

module.exports = {
  getAllUsers,
  getUserById,
  putUserById,
  deleteUserById,
  putUserPassword,
};
