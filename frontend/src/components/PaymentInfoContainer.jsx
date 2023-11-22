import React from "react";
import ButtonLink from "./ButtonLink";
import InfoContainer from "./InfoContainer";
import formatDate from "@/libs/formatDate";

const PaymentInfoContainer = ({
  title,
  playerId,
  playerName,
  playerEmail,
  tournamentId,
  tournamentName,
  paypalPayerId,
  paymentId,
  createdAt,
}) => {
  return (
    <>
      <div className="px-8 py-3 mx-6 my-2 text-2xl font-bold">
        <h1>{title}</h1>
      </div>
      <div className="grid grid-cols-2 gap-1">
        <InfoContainer label="Id Jugador:" info={playerId} />
        <InfoContainer label="Jugador:" info={playerName} />
        <InfoContainer label="Email:" info={playerEmail} />
        <InfoContainer label="Id Torneo:" info={tournamentId} />
        <InfoContainer label="Torneo:" info={tournamentName} />
        <InfoContainer label="Id Usuario paypal:" info={paypalPayerId} />
        <InfoContainer label="Id Pago:" info={paymentId} />
        <InfoContainer label="Fecha:" info={formatDate(createdAt)} />
      </div>
      <div className="flex px-8 py-3 mx-6 my-2 justify-center items-center">
        <ButtonLink link="/dashboard/payments" text="Volver" />
      </div>
    </>
  );
};

export default PaymentInfoContainer;
