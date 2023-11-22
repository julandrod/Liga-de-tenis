require("dotenv").config();
const paypal = require("@paypal/checkout-server-sdk");
const prisma = require("./db");
const { CustomError } = require("../helpers");

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_SECRET_KEY;

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

const createOrder = async ({ tournamentName }) => {
  let request = new paypal.orders.OrdersCreateRequest();

  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "10.00",
        },
        description: tournamentName,
      },
    ],
  });

  const response = await client.execute(request);

  return { orderId: response.result.id };
};

const successOrder = async ({
  playerId,
  tournamentId,
  paypalPayerId,
  paymentId,
}) => {
  try {
    const order = await prisma.payment.create({
      data: {
        playerId,
        tournamentId,
        paypalPayerId,
        paymentId,
      },
    });

    return order;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

module.exports = { createOrder, successOrder };
