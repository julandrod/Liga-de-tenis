const CustomError = require("./errorResponse");

const checkPermissions = (reqUser, resourceUserId) => {
  if (reqUser.role === "ADMIN") return;
  if (reqUser.id === resourceUserId) return;

  throw new CustomError("Not allowed to access this route", 401);
};

module.exports = checkPermissions;
