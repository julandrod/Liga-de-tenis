import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { fetchInfo } from "@/libs/data";
import TournamentsContainer from "@/components/TournamentsContainer";

const TournamentsPage = async ({ searchParams }) => {
  const session = await getServerSession(authOptions);
  const accessToken = session?.user.token;
  const page = searchParams?.page || 1;
  const {
    body: { tournaments, totalCount, pageSize },
  } = await fetchInfo({
    accessToken,
    page,
    endpoint: "tournaments",
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
