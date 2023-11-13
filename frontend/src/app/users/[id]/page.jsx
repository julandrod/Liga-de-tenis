import { getServerSession } from "next-auth";
import { fetchSingleUser } from "@/libs/data";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserInfoContainer from "@/components/UserInfoContainer";

const SingleUserPage = async ({ params }) => {
  const { id } = params;
  const session = await getServerSession(authOptions);
  const accessToken = session?.user.token;

  const { user } = await fetchSingleUser({ accessToken, id });
  const { id: userId, name, lastName, email, age, gender } = user;

  return (
    <UserInfoContainer
      title="Informacion del usuario"
      id={userId}
      accessToken={accessToken}
      name={name}
      lastName={lastName}
      email={email}
      age={age}
      gender={gender}
    />
  );
};

export default SingleUserPage;
