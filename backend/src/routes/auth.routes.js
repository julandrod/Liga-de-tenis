const router = require("express").Router();
const authControllers = require("../controllers/auth.controllers");
const { authenticateUser } = require("../middlewares");
const { validatorMiddleware } = require("../middlewares");
const { registerUser, loginUser } = require("../validator-schemas/auth.schema");

router.post(
  "/register",
  validatorMiddleware(registerUser),
  authControllers.registerUser
);

router.post(
  "/login",
  validatorMiddleware(loginUser),
  authControllers.loginUser
);

router.get("/showme", authenticateUser, authControllers.getMyInfo);

module.exports = router;
