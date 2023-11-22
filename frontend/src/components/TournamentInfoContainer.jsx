import InfoContainer from "./InfoContainer";
import ButtonLink from "./ButtonLink";
import formatDate from "@/libs/formatDate";
import InteractiveButton from "./InteractiveButton";
import PaymentButton from "./PaymentButton";

/**
 * Render a container component with the information of a tournament
 * @param {Object} props
 * @param {String} props.title Title of the container
 * @param {String} props.id Id of the tournament
 * @param {String} props.name Name of the tournament
 * @param {String} props.description Description of the tournament
 * @param {Date} props.startDate Start date of the tournament
 * @param {Date} props.endDate End date of the tournament
 * @param {Number} props.totalPlayers Total number of players in the tournament
 * @param {String} props.accessToken Access token of the user
 * @param {String} props.playerId Id of the player
 * @param {Boolean} props.alreadyInTournament Whether the player is already in the tournament
 * @param {String} props.role Role of the user
 * @returns Container component
 */

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
