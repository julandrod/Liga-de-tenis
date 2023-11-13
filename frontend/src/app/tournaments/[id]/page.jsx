import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ButtonLink from "@/components/ButtonLink";
import InfoContainer from "@/components/InfoContainer";
import TournamentInfoContainer from "@/components/TournamentInfoContainer";
import { fetchSingleTournament } from "@/libs/data";
import formatDate from "@/libs/formatDate";
import { getServerSession } from "next-auth";

const SingleTournamentPage = async ({ params }) => {
  const { id } = params;
  const session = await getServerSession(authOptions);
  const accessToken = session?.user.token;
  const role = session?.user.role;
  const { tournament } = await fetchSingleTournament({
    accessToken,
    id,
  });
  const {
    id: tournamentId,
    name,
    description,
    startDate,
    endDate,
  } = tournament;
  const playerId = session?.user.id;
  const players = tournament?.players;
  const totalPlayers = players.length;

  const alreadyInTournament = players.find((player) => player.id === playerId);

  return (
    <>
      <TournamentInfoContainer
        title="Informacion del torneo"
        id={tournamentId}
        name={name}
        description={description}
        startDate={startDate}
        endDate={endDate}
        totalPlayers={totalPlayers}
        accessToken={accessToken}
        playerId={playerId}
        alreadyInTournament={alreadyInTournament}
        role={role}
      />
    </>
  );
};

export default SingleTournamentPage;
