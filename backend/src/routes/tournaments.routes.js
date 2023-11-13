const {
  authorizeByRole,
  authenticateUser,
} = require("../middlewares/auth.middleware");
const tournamentControllers = require("../controllers/tournaments.controllers");

const router = require("express").Router();

router
  .route("/")
  .get(authenticateUser, tournamentControllers.getAllTournaments)
  .post(
    [authenticateUser, authorizeByRole("ADMIN")],
    tournamentControllers.postTournament
  );

router
  .route("/:tournamentId")
  .get(authenticateUser, tournamentControllers.getTournament)
  .put(
    [authenticateUser, authorizeByRole("ADMIN")],
    tournamentControllers.putTournament
  )
  .delete(
    [authenticateUser, authorizeByRole("ADMIN")],
    tournamentControllers.deleteTournament
  );

router.post(
  "/addplayer/:tournamentId",
  authenticateUser,
  tournamentControllers.postAddPlayerTournament
);

router.post(
  "/removeplayer/:tournamentId",
  authenticateUser,
  tournamentControllers.postRemovePlayerTournament
);

module.exports = router;
