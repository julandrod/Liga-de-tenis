const { tryCatchWrapper, endpointResponse } = require("../helpers");
const paymentServices = require("../services/payments.services");

const getAllPayments = tryCatchWrapper(async (req, res, next) => {
  const { page: pageNumber, query } = req.query;
  const payments = await paymentServices.findAllPayments({ pageNumber, query });

  endpointResponse({
    res,
    message: "All payments listed successfully",
    body: payments,
  });
});

const getSinglePayment = tryCatchWrapper(async (req, res, next) => {
  const { paymentId } = req.params;
  const payment = await paymentServices.findSinglePayment({ paymentId });

  endpointResponse({
    res,
    message: "Payment found successfully",
    body: { payment },
  });
});

module.exports = { getAllPayments, getSinglePayment };
