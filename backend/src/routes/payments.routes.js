const { authorizeByRole, authenticateUser } = require("../middlewares");
const paymentControllers = require("../controllers/payments.controller");

const router = require("express").Router();

router.use([authenticateUser, authorizeByRole("ADMIN")]);

router.get("/", paymentControllers.getAllPayments);

router.get("/:paymentId", paymentControllers.getSinglePayment);

module.exports = router;
        