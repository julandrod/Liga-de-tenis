const {
  CustomError,
  checkPermissions,
  comparePassword,
  encryptPassword,
} = require("../helpers");
const prisma = require("./db");

// Fields to show in every return of the model User
const selectFields = {
  id: true,
  name: true,
  lastName: true,
  age: true,
  gender: true,
  email: true,
  role: true,
  history: true,
  participatingTournaments: false,
  createdTournaments: false,
};

const findAllUsers = async ({ role, query, pageNumber }) => {
  try {
    const newSelections =
      role === "ADMIN"
        ? { ...selectFields, createdTournaments: true }
        : { ...selectFields, participatingTournaments: true };

    let customQuery = {};
    const pageSize = 10;
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;

    if (query) {
      customQuery = {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { lastName: { contains: query, mode: "insensitive" } },
          // { age: { equals: parseInt(query) } },
          // { gender: { equals: query } },
        ],
      };
    }

    const totalUsers = await prisma.user.count();
    const pageUsers = await prisma.user.findMany({
      where: customQuery,
      skip,
      take,
      select: newSelections,
    });

    const usersWithoutPassword = pageUsers.map((user) => {
      const { password, ...otherInfo } = user;
      return otherInfo;
    });

    return { users: usersWithoutPassword, pageSize, totalCount: totalUsers };
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const findSingleUser = async ({ userId }) => {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { ...selectFields, participatingTournaments: true },
    });

    return user;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const findAndUpdateUser = async ({
  userId,
  reqUser,
  name,
  lastName,
  age,
  gender,
  email,
}) => {
  try {
    checkPermissions(reqUser, userId);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        lastName,
        age,
        gender,
        email,
      },
      select: selectFields,
    });

    return updatedUser;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const findAndDeleteUser = async ({ userId, reqUser }) => {
  try {
    checkPermissions(reqUser, userId);

    const deletedUser = await prisma.user.delete({
      where: { id: userId },
      select: selectFields,
    });

    return deletedUser;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const resetPassword = async ({ userId, reqUser, oldPassword, newPassword }) => {
  try {
    checkPermissions(reqUser, userId);

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const passwordMatch = await comparePassword(oldPassword, user.password);
    if (!passwordMatch) {
      throw new CustomError("Wrong password", 401);
    }

    const newHashPassword = await encryptPassword(newPassword);

    const userWithNewPass = await prisma.user.update({
      where: { id: user.id },
      data: {
        password: newHashPassword,
      },
      select: selectFields,
    });

    return userWithNewPass;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

module.exports = {
  findAllUsers,
  findSingleUser,
  findAndUpdateUser,
  findAndDeleteUser,
  resetPassword,
};
