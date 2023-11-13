import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { fetchMyInfo } from "@/libs/data";
import UserInfoContainer from "@/components/UserInfoContainer";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  const accessToken = session?.user.token;
  const role = session?.user.role;
  const { myInfo } = await fetchMyInfo({ accessToken });
  const { id, name, lastName, email, age, gender } = myInfo;
  

  return (
    <UserInfoContainer
      title="Informacion de mi perfil"
      id={id}
      accessToken={accessToken}
      name={name}
      lastName={lastName}
      email={email}
      age={age}
      gender={gender}
      role={role}
      isMyProfile
    />
  );
};

export default ProfilePage;
