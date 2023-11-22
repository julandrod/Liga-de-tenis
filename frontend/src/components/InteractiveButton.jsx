"use client";
import { addPlayerToTournament, deleteSingleInfo } from "@/libs/data";
import { useRouter } from "next/navigation";
import { alertMessage } from "./AlertMessage";

const InteractiveButton = ({
  text,
  userId,
  tournamentId,
  accessToken,
  routeToReturn,
  isDeleteUser,
  isDeleteTournament,
  isAddPlayer,
}) => {
  const router = useRouter();

  const handleInteraction = async () => {
    let res;

    if (isDeleteUser) {
      res = await deleteSingleInfo({
        accessToken,
        id: userId,
        endpoint: "users",
      });
    }
    if (isDeleteTournament) {
      res = await deleteSingleInfo({
        accessToken,
        id: tournamentId,
        endpoint: "tournaments",
      });
    }

    if (isAddPlayer) {
      res = await addPlayerToTournament({
        accessToken,
        id: tournamentId,
        playerId: userId,
      });
    }

    const infoAlert = {
      title: `${
        isDeleteUser || isDeleteTournament
          ? "Eliminado Correcto"
          : "Agregado Correcto"
      }`,
      text: `${
        isDeleteUser || isDeleteTournament
          ? "Se ha eliminado la informacion"
          : "Se ha agregado la informacion"
      }`,
    };

    const successResponse = await alertMessage({
      title: infoAlert.title,
      text: infoAlert.text,
      response: res,
      code: 200,
    });

    if (successResponse) router.push(routeToReturn);
  };

  return (
    <button
      onClick={() => handleInteraction()}
      className={`${
        isDeleteUser || isDeleteTournament
          ? "border-red-600 text-red-600 hover:border-red-900"
          : "border-teal-600 text-teal-600 hover:border-teal-900"
      } inline-block ml-2 px-6 py-2 border-2 font-medium text-xs leading-tight uppercase rounded hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out`}
    >
      {text}
    </button>
  );
};

export default InteractiveButton;
