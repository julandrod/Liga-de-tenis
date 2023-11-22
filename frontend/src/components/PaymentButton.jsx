"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import {
  addPlayerToTournament,
  createOrderPayment,
  successOrder,
} from "@/libs/data";
import { alertMessage } from "./AlertMessage";

const PaymentButton = ({ accessToken, tournamentName, tournamentId, playerId }) => {
  const router = useRouter();

  const handleApprove = async ({ paypalPayerId, paymentId }) => {
    const completeOrder = await successOrder({
      accessToken,
      paymentId,
      paypalPayerId,
      playerId,
      tournamentId,
    });

    if (completeOrder.code === 201) {
      const response = await addPlayerToTournament({
        accessToken,
        id: tournamentId,
        playerId,
      });

      const successResponse = await alertMessage({
        title: "Pago Exitoso!",
        text: "Tu pago se ha registrado y ahora estas inscrito en el torneo",
        response: response,
        code: 200,
      });

      if (successResponse) router.push("/profile/mytournaments");
    }
  };

  const handleCancel = async () => {
    await alertMessage({
      response: "Se ha cancelado el proceso de pago",
    });

    if (!successResponse) router.push("/tournaments");
  };

  return (
    <div className="p-4">
      <span>Inscribete</span>
      <PayPalScriptProvider
        options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
      >
        <PayPalButtons
          style={{
            color: "silver",
            layout: "horizontal",
            label: "pay",
          }}
          createOrder={async (data, actions) => {
            const orderId = await createOrderPayment({
              accessToken,
              tournamentName,
            });
            return orderId;
          }}
          onCancel={(data) => handleCancel()}
          onApprove={(data, actions) => {
            console.log("Approve order: ", data);
            console.log("actions: ", actions);

            actions.order.capture().then(
              handleApprove({
                paypalPayerId: data.payerID,
                paymentId: data.paymentID,
              })
            );
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PaymentButton;
