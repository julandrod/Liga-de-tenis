import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ButtonLink from "@/components/ButtonLink";
import CreateTournament from "@/components/CreateTournament";
import { getServerSession } from "next-auth";


const CreateTournamentePage = async () => {
  const session = await getServerSession(authOptions);
  const accessToken = session?.user.token;
  const role = session?.user.role;

  if (role === "PLAYER") {
    return (
      <div className="px-8 py-3 mx-6 my-2 text-2xl font-bold">
        <h1>No tienes permiso para ver esta pagina</h1>
        <ButtonLink link="/" text="Ir al inicio" />
      </div>
    );
  }

  return (
   <CreateTournament title="Nuevo torneo" accessToken={accessToken}/>
  );
};

export default CreateTournamentePage;
