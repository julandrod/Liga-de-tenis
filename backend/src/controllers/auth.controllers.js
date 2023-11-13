const { tryCatchWrapper, endpointResponse } = require("../helpers");
const authServices = require("../services/auth.services");

const registerUser = tryCatchWrapper(async (req, res, next) => {
  const { name, lastName, email, password } = req.body;
  const registerUser = await authServices.createUser({
    name,
    lastName,
    email,
    password,
  });

  endpointResponse({
    res,
    code: 201,
    message: "User created successfully",
    body: registerUser,
  });
});

const loginUser = tryCatchWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const infoUser = await authServices.findAndLogin({ email, password });

  endpointResponse({
    res,
    message: "Login successfully",
    body: { ...infoUser },
  });
});

const getMyInfo = tryCatchWrapper(async (req, res, next) => {
  const { id: userId } = req.user;
  const myInfo = await authServices.showMyInfo({ userId });

  endpointResponse({
    res,
    message: "My info show correctly",
    body: { myInfo },
  });
});

module.exports = { registerUser, loginUser, getMyInfo };
