const { CustomError } = require("../helpers");
const prisma = require("./db");

const selectFieldsTournament = {
  id: true,
  name: true,
  description: true,
  startDate: true,
  endDate: true,
};

const selectFieldsPlayer = {
  id: true,
  name: true,
  lastName: true,
  age: true,
  gender: true,
  email: true,
  role: true,
};

const findAllTournaments = async ({ pageNumber, query }) => {
  try {
    const pageSize = 6;
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;
    let customQuery = {};

    if (query) {
      customQuery = {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      };
    }

    const totalTournament = await prisma.tournament.count();
    const pageTournaments = await prisma.tournament.findMany({
      where: customQuery,
      skip,
      take,
      orderBy: {
        startDate: "asc",
      },
      select: {
        ...selectFieldsTournament,
        // players: { select: selectFieldsPlayer },
      },
    });

    return { tournaments: pageTournaments, pageSize, totalCount: totalTournament };
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const createTournament = async ({
  name,
  description,
  startDate,
  endDate,
  creatorId,
}) => {
  try {
    const tournament = await prisma.tournament.create({
      data: { name, description, startDate, endDate, creatorId },
    });

    return tournament;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const findSingleTournament = async ({ tournamentId }) => {
  try {
    const tournament = await prisma.tournament.findUniqueOrThrow({
      where: { id: tournamentId },
      select: {
        ...selectFieldsTournament,
        players: { select: selectFieldsPlayer },
      },
    });

    return tournament;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const updateTournamentById = async ({
  tournamentId,
  name,
  description,
  startDate,
  endDate,
}) => {
  try {
    const updatedTournament = await prisma.tournament.update({
      where: { id: tournamentId },
      data: { name, description, startDate, endDate },
      select: {
        ...selectFieldsTournament,
        players: { select: selectFieldsPlayer },
      },
    });

    return updatedTournament;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const deleteTournamentById = async ({ tournamentId }) => {
  try {
    const deletedTournament = await prisma.tournament.delete({
      where: { id: tournamentId },
    });

    return deletedTournament;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const addPlayerToTournament = async ({ playerId, tournamentId }) => {
  try {
    const tournament = await prisma.tournament.update({
      where: { id: tournamentId },
      data: { players: { connect: { id: playerId } } },
      select: {
        ...selectFieldsTournament,
        players: { select: selectFieldsPlayer },
      },
    });

    return tournament;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

const removePlayerFromTournament = async ({ playerId, tournamentId }) => {
  try {
    const tournament = await prisma.tournament.update({
      where: { id: tournamentId },
      data: { players: { disconnect: { id: playerId } } },
      select: {
        ...selectFieldsTournament,
        players: { select: selectFieldsPlayer },
      },
    });

    return tournament;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode, error.errors);
  }
};

module.exports = {
  findAllTournaments,
  createTournament,
  findSingleTournament,
  updateTournamentById,
  deleteTournamentById,
  addPlayerToTournament,
  removePlayerFromTournament,
};
