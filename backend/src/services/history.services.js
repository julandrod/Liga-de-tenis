const { CustomError } = require("../helpers");
const prisma = require("./db");

const addHistoryPlayer = async ({
  playerId,
  tournamentId,
  points,
  position,
}) => {
  try {
    const newEntryHistory = await prisma.history.create({
      data: {
        player: { connect: { id: playerId } },
        tournament: { connect: { id: tournamentId } },
        points,
        position,
      },
    });

    return newEntryHistory;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

module.exports = { addHistoryPlayer };
