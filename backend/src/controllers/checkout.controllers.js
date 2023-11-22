const { tryCatchWrapper, endpointResponse } = require("../helpers");
const checkoutServices = require("../services/checkout.services");

const postCheckout = tryCatchWrapper(async (req, res, next) => {
  const { tournamentName } = req.body;

  const response = await checkoutServices.createOrder({
    tournamentName,
  });

  endpointResponse({
    res,
    code: 201,
    message: "checkout successfully",
    body: response,
  });
});

const postSuccessOrder = tryCatchWrapper(async (req, res, next) => {
  const { playerId, tournamentId, paypalPayerId, paymentId } =
    req.body;
  const order = await checkoutServices.successOrder({
    playerId,
    tournamentId,
    paypalPayerId,
    paymentId,
  });

  endpointResponse({
    res,
    code: 201,
    message: "order successfully",
    body: order,
  });
});

module.exports = { postCheckout, postSuccessOrder };
