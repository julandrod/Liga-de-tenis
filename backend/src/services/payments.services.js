const { CustomError } = require("../helpers");
const prisma = require("./db");

const findAllPayments = async ({ pageNumber, query }) => {
  try {
    const pageSize = 10;
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;
    let customQuery = {};

    if (query) {
      customQuery = {
        OR: [
          { playerId: { equals: query } },
          { tournamentId: { equals: query } },
          { paymentId: { equals: query } },
        ],
      };
    }

    const totalPayments = await prisma.payment.count();
    const pagePayments = await prisma.payment.findMany({
      where: customQuery,
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
    });

    return { payments: pagePayments, pageSize, totalCount: totalPayments };
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const findSinglePayment = async ({ paymentId }) => {
  try {
    const payment = await prisma.payment.findUniqueOrThrow({
      where: { id: paymentId },
    });

    return payment;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

module.exports = { findAllPayments, findSinglePayment };
