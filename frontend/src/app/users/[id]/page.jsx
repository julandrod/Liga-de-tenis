import { getServerSession } from "next-auth";
import { fetchSingleInfo } from "@/libs/data";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserInfoContainer from "@/components/UserInfoContainer";

const SingleUserPage = async ({ params }) => {
  const { id } = params;
  const session = await getServerSession(authOptions);
  const accessToken = session?.user.token;

  const {
    body: { user },
  } = await fetchSingleInfo({ accessToken, id, endpoint: "users" });

  return (
    <UserInfoContainer
      title="Informacion del usuario"
      id={user.id}
      accessToken={accessToken}
      name={user.name}
      lastName={user.lastName}
      email={user.email}
      age={user.age}
      gender={user.gender}
    />
  );
};

export default SingleUserPage;
