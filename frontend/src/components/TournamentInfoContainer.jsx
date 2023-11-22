import InfoContainer from "./InfoContainer";
import ButtonLink from "./ButtonLink";
import formatDate from "@/libs/formatDate";
import InteractiveButton from "./InteractiveButton";
import UserInfoContainer from "./UserInfoContainer";
import PaymentButton from "./PaymentButton";

const TournamentInfoContainer = ({
  title,
  id,
  name,
  description,
  startDate,
  endDate,
  totalPlayers,
  accessToken,
  playerId,
  alreadyInTournament,
  role,
}) => {
  return (
    <>
      <div className="px-8 py-3 mx-6 my-2 text-2xl font-bold">
        <h1>{title}</h1>
        {alreadyInTournament ? (
          <h1 className="mt-2">Ya estas registrado en este torneo!</h1>
        ) : null}
      </div>
      <div className="grid grid-cols-2 gap-1">
        <InfoContainer label="Nombre:" info={name} />
        <InfoContainer label="Descripcion:" info={description} />
        <InfoContainer label="Inicia:" info={formatDate(startDate)} />
        <InfoContainer label="Termina:" info={formatDate(endDate)} />
        <InfoContainer label="Numero de participantes:" info={totalPlayers} />
      </div>
      <div className="flex px-8 py-3 mx-6 my-2 justify-center items-center">
        <ButtonLink link="/tournaments" text="Volver" />
        {!alreadyInTournament ? (
          // <InteractiveButton
          //   text="Registrarme"
          //   accessToken={accessToken}
          //   tournamentId={id}
          //   userId={playerId}
          //   routeToReturn="/profile"
          //   isAddPlayer
          // />
          <PaymentButton
            accessToken={accessToken}
            tournamentName={name}
            tournamentId={id}
            playerId={playerId}
          />
        ) : null}
        {role === "ADMIN" ? (
          <InteractiveButton
            text="Eliminar torneo"
            accessToken={accessToken}
            tournamentId={id}
            routeToReturn="/tournaments"
            isDeleteTournament
          />
        ) : null}
      </div>
    </>
  );
};

export default TournamentInfoContainer;
