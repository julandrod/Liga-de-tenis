const {
  CustomError,
  encryptPassword,
  comparePassword,
  createJwt,
} = require("../helpers");
const prisma = require("./db");

const createUser = async ({ name, lastName, email, password }) => {
  try {
    const alreadyRegister = await prisma.user.findUnique({ where: { email } });

    if (alreadyRegister) {
      throw new CustomError("User already register", 400);
    }

    const hashPassword = await encryptPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name,
        lastName,
        email,
        password: hashPassword,
      },
      select: {
        name: true,
        lastName: true,
        email: true,
      },
    });

    return newUser;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const findAndLogin = async ({ email, password }) => {
  try {
    const userFound = await prisma.user.findUnique({ where: { email } });

    if (!userFound) {
      throw new CustomError("User not found with this email", 404);
    }

    const passwordMatch = await comparePassword(password, userFound.password);
    if (!passwordMatch) {
      throw new CustomError("Incorrect password", 400);
    }

    const token = createJwt({
      payload: { id: userFound.id, role: userFound.role },
    });

    return {
      id: userFound.id,
      username: userFound.name,
      role: userFound.role,
      token,
    };
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const showMyInfo = async ({ userId }) => {
  try {
    const myInfo = await prisma.user.findFirstOrThrow({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        age: true,
        gender: true,
        participatingTournaments: true,
      },
    });

    return myInfo;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

module.exports = { createUser, findAndLogin, showMyInfo };
