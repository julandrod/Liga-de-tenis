import React from "react";
import InfoContainer from "./InfoContainer";
import ButtonLink from "./ButtonLink";
import DeleteButton from "./DeleteButton";
import InteractiveButton from "./InteractiveButton";

const UserInfoContainer = ({
  title,
  id,
  accessToken,
  name,
  lastName,
  email,
  age,
  gender,
  role,
  isMyProfile,
}) => {
  return (
    <>
      <div className="px-8 py-3 mx-6 my-2 text-2xl font-bold">
        <h1>{title}</h1>
      </div>
      <div className="grid grid-cols-2 gap-1">
        <InfoContainer label="Id:" info={id} />
        <InfoContainer label="Nombre:" info={name} />
        <InfoContainer label="Apellido:" info={lastName} />
        <InfoContainer label="Email:" info={email} />
        <InfoContainer label="Edad" info={age} />
        <InfoContainer label="Genero" info={gender} />
      </div>
      <div className="flex px-8 py-3 mx-6 my-2 justify-center items-center">
        {isMyProfile ? (
          <>
            {role === "ADMIN" ? (
              <ButtonLink
                text="Crear nuevo torneo"
                link="/tournaments/create"
              />
            ) : null}
            <ButtonLink
              link={{
                pathname: "/profile/edit",
                query: {
                  id,
                  name,
                  lastName,
                  email,
                  age,
                  gender,
                  token: accessToken,
                },
              }}
              text="Actualizar informacion"
            />
            <ButtonLink link="/profile/mytournaments" text="Mis torneos" />
            <InteractiveButton
              text="Eliminar mi cuenta"
              userId={id}
              accessToken={accessToken}
              routeToReturn="/"
              isDeleteUser
            />
          </>
        ) : (
          <>
            <ButtonLink link="/users" text="Volver" />
            <ButtonLink link="/users" text="Ver torneos" />
            <InteractiveButton
              text="Eliminar"
              userId={id}
              accessToken={accessToken}
              routeToReturn="/users"
              isDeleteUser
            />
          </>
        )}
      </div>
    </>
  );
};

export default UserInfoContainer;
