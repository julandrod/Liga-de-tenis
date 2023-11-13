const { tryCatchWrapper, endpointResponse } = require("../helpers");
const tournamentServices = require("../services/tournaments.services");
const userServices = require("../services/users.services");

const getAllTournaments = tryCatchWrapper(async (req, res, next) => {
  const { page: pageNumber, query } = req.query;
  const tournaments = await tournamentServices.findAllTournaments({
    pageNumber,
    query,
  });

  endpointResponse({
    res,
    message: "All tournaments listed successfully",
    body: tournaments,
  });
});

const postTournament = tryCatchWrapper(async (req, res, next) => {
  const { name, description, startDate, endDate } = req.body;
  const newTournament = await tournamentServices.createTournament({
    name,
    description,
    startDate,
    endDate,
    creatorId: req.user.id,
  });

  endpointResponse({
    res,
    code: 201,
    message: "Tournament created successfully",
    body: { tournament: newTournament },
  });
});

const getTournament = tryCatchWrapper(async (req, res, next) => {
  const { tournamentId } = req.params;
  const tournament = await tournamentServices.findSingleTournament({
    tournamentId,
  });

  endpointResponse({
    res,
    message: "Tournament found successfully",
    body: { tournament },
  });
});

const putTournament = tryCatchWrapper(async (req, res, next) => {
  const { tournamentId } = req.params;
  const { name, description, startDate, endDate } = req.body;
  await tournamentServices.findSingleTournament({ tournamentId });
  const tournamentUpdated = await tournamentServices.updateTournamentById({
    tournamentId,
    name,
    description,
    startDate,
    endDate,
  });

  endpointResponse({
    res,
    message: "Tournament updated successfully",
    body: { tournament: tournamentUpdated },
  });
});

const deleteTournament = tryCatchWrapper(async (req, res, next) => {
  const { tournamentId } = req.params;
  await tournamentServices.findSingleTournament({ tournamentId });
  const tournamentDeleted = await tournamentServices.deleteTournamentById({
    tournamentId,
  });

  endpointResponse({
    res,
    message: "Tournament deleted successfully",
    body: { tournament: tournamentDeleted },
  });
});

const postAddPlayerTournament = tryCatchWrapper(async (req, res, next) => {
  const { tournamentId } = req.params;
  const { playerId } = req.body;
  await tournamentServices.findSingleTournament({ tournamentId });
  await userServices.findSingleUser({ userId: playerId });
  const tournament = await tournamentServices.addPlayerToTournament({
    tournamentId,
    playerId,
  });

  endpointResponse({
    res,
    message: "Player added to tournament successfully",
    body: { tournament },
  });
});

const postRemovePlayerTournament = tryCatchWrapper(async (req, res, next) => {
  const { tournamentId } = req.params;
  const { playerId } = req.body;
  await tournamentServices.findSingleTournament({ tournamentId });
  await userServices.findSingleUser({ userId: playerId });
  const tournament = await tournamentServices.removePlayerFromTournament({
    tournamentId,
    playerId,
  });

  endpointResponse({
    res,
    message: "Player removed from tournament successfully",
    body: { tournament },
  });
});

module.exports = {
  getAllTournaments,
  postTournament,
  getTournament,
  putTournament,
  deleteTournament,
  postAddPlayerTournament,
  postRemovePlayerTournament,
};
