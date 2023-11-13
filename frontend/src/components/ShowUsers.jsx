import { fetchUsers } from "@/libs/data";
import { useSession } from "next-auth/react";

const ShowUsers = async ({ accessToken }) => {
  const users = await fetchUsers({ accessToken });


  return <div>ShowUsers</div>;
};

export default ShowUsers;
