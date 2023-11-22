import formatDate from "@/libs/formatDate";
import React from "react";
import ButtonLink from "./ButtonLink";

/**
 * Render a custom card component for tournaments
 * @param {Object} props 
 * @param {String} props.id Id of the tournament
 * @param {String} props.name Name of the tournament
 * @param {String} props.description Description of the tournament 
 * @param {Date} props.startDate Start date of the tournament 
 * @param {Date} props.endDate End date of the tournament 
 * @returns Custom card component
 */

const CardTournament = ({ id, name, description, startDate, endDate }) => {
  return (
    <div className="flex bg-bg-secondary w-full h-64 md:h-80 md:w-96 capitalize rounded-md border-2 border-white">
      <div className="flex flex-col m-4 justify-center">
        <div>
          <h3>Nombre torneo:</h3>
          <h1 className="font-extrabold text-lg mb-2 text-primary-red">
            {name}
          </h1>
        </div>
        <div>
          <h3>Descripcion:</h3>
          <h1 className="font-extrabold text-base mb-2">
            {description.length > 60
              ? description.slice(0, 60) + "..."
              : description}
          </h1>
        </div>
        <div className="flex my-2 p-2 text-xl justify-center items-center">
          <div className="flex flex-col text-base px-2 bg-green-600 rounded-md items-center justify-center">
            <h4>Inicia:</h4>
            <h2>{formatDate(startDate)}</h2>
          </div>
          <div className="flex flex-col text-base px-2 bg-red-600 rounded-md items-center justify-center ml-2">
            <h4>Finaliza:</h4>
            <h2>{formatDate(endDate)}</h2>
          </div>
        </div>
        <div>
          <ButtonLink link={`/tournaments/${id}`} text="Mas detalles" />
        </div>
      </div>
    </div>
  );
};

export default CardTournament;
