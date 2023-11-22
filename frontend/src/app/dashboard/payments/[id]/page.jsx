import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ButtonLink from "@/components/ButtonLink";
import PaymentInfoContainer from "@/components/PaymentInfoContainer";
import { fetchSingleInfo } from "@/libs/data";
import { getServerSession } from "next-auth";
import React from "react";

const SinglePaymentPage = async ({ params }) => {
  const { id } = params;
  const session = await getServerSession(authOptions);
  const accessToken = session?.user.token;
  const role = session?.user.role;

  const {
    body: {
      payment: { playerId, tournamentId, paypalPayerId, paymentId, createdAt },
    },
  } = await fetchSingleInfo({ accessToken, id, endpoint: "payments" });

  console.log(playerId, tournamentId);

  const {
    body: {
      user: { name, lastName, email },
    },
  } = await fetchSingleInfo({ accessToken, id: playerId, endpoint: "users" });

  const {
    body: {
      tournament: { name: tournamentName },
    },
  } = await fetchSingleInfo({
    accessToken,
    id: tournamentId,
    endpoint: "tournaments",
  });

  if (role === "PLAYER") {
    return (
      <div className="px-8 py-3 mx-6 my-2 text-2xl font-bold">
        <h1>No tienes permiso para ver esta pagina</h1>
        <ButtonLink link="/" text="Ir al inicio" />
      </div>
    );
  }

  return (
    <PaymentInfoContainer
      title="Informacion del pago"
      playerId={playerId}
      playerName={`${name} ${lastName}`}
      playerEmail={email}
      tournamentId={tournamentId}
      tournamentName={tournamentName}
      paypalPayerId={paypalPayerId}
      paymentId={paymentId}
      createdAt={createdAt}
    />
  );
};

export default SinglePaymentPage;
