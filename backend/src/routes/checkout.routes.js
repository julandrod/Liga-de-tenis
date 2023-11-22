const router = require("express").Router();
const checkoutControllers = require("../controllers/checkout.controllers");
const { authenticateUser } = require("../middlewares");

router.post("/", authenticateUser, checkoutControllers.postCheckout);

router.post("/success", authenticateUser, checkoutControllers.postSuccessOrder);

module.exports = router;
