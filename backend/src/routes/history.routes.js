const { authenticateUser, authorizeByRole } = require("../middlewares");
const historyControllers = require("../controllers/history.controllers");

const router = require("express").Router();

router.post(
  "/add",
  [authenticateUser, authorizeByRole("ADMIN")],
  historyControllers.postAddHistory
    );

module.exports = router;
