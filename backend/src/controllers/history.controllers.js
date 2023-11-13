const { tryCatchWrapper, endpointResponse } = require("../helpers");
const userServices = require("../services/users.services");
const tournamentServices = require("../services/tournaments.services");
const historyServices = require("../services/history.services");

const postAddHistory = tryCatchWrapper(async (req, res, next) => {
  const { playerId, tournamentId, points, position } = req.body;
  await userServices.findSingleUser({ userId: playerId });
  await tournamentServices.findSingleTournament({ tournamentId });
  const newEntryHistory = await historyServices.addHistoryPlayer({
    playerId,
    tournamentId,
    points,
    position,
  });

  endpointResponse({
    res,
    code: 201,
    message: "New entry history created successfully",
    body: { history: newEntryHistory },
  });
});

module.exports = { postAddHistory };
