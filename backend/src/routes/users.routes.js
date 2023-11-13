const router = require("express").Router();
const userControllers = require("../controllers/users.controllers");
const { authenticateUser, authorizeByRole } = require("../middlewares");

router.get("/", authenticateUser, userControllers.getAllUsers);

router
  .route("/:userId")
  .get(authenticateUser, userControllers.getUserById)
  .put(authenticateUser, userControllers.putUserById)
  .delete(authenticateUser, userControllers.deleteUserById);

router.put(
  "/resetpassword/:userId",
  authenticateUser,
  userControllers.putUserPassword
);

module.exports = router;
