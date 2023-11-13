const router = require("express").Router();
const authControllers = require("../controllers/auth.controllers");
const { authenticateUser } = require("../middlewares");

router.post("/register", authControllers.registerUser);

router.post("/login", authControllers.loginUser);

router.get("/showme", authenticateUser, authControllers.getMyInfo);

module.exports = router;
