import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { fetchTournaments } from "@/libs/data";
import CardTournament from "@/components/CardTournament";
import Pagination from "@/components/Pagination";
import TournamentsContainer from "@/components/TournamentsContainer";

const TournamentsPage = async ({ searchParams }) => {
  const session = await getServerSession(authOptions);
  const accessToken = session?.user.token;
  const page = searchParams?.page || 1;
  const { tournaments, totalCount, pageSize } = await fetchTournaments({
    accessToken,
    page,
  });

  return (
    <TournamentsContainer
      title="Torneos"
      tournaments={tournaments}
      totalCount={totalCount}
      pageSize={pageSize}
    />
  );
};

export default TournamentsPage;
