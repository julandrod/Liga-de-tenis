import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CardTournament from "@/components/CardTournament";
import TournamentsContainer from "@/components/TournamentsContainer";
import { fetchMyInfo } from "@/libs/data";
import { getServerSession } from "next-auth";

const MyTournamentsPage = async () => {
  const session = await getServerSession(authOptions);
  const accessToken = session?.user.token;
  const { myInfo } = await fetchMyInfo({ accessToken });

  return (
    <TournamentsContainer
      title="Torneos"
      tournaments={myInfo?.participatingTournaments}
      isMyProfile
   /> 
  );
};

export default MyTournamentsPage;
