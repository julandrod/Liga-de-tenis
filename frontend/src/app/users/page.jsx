import { fetchUsers } from "@/libs/data";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Pagination from "@/components/Pagination";
import ButtonLink from "@/components/ButtonLink";

const UsersPage = async ({ searchParams }) => {
  const page = searchParams?.page || 1;
  const session = await getServerSession(authOptions);
  const accessToken = session?.user.token;
  const role = session?.user.role;

  const { users, pageSize, totalCount } = await fetchUsers({
    accessToken,
    page,
  });

  if (role === "PLAYER") {
    return (
      <div className="px-8 py-3 mx-6 my-2 text-2xl font-bold">
        <h1>No tienes permiso para ver esta pagina</h1>
        <ButtonLink link="/" text="Ir al inicio" />
      </div>
    );
  }

  return (
    <>
      <div className="px-8 py-3 mx-6 my-2 text-2xl font-bold">
        <h1>Lista de usuarios</h1>
      </div>
      <div className="flex mb-6">
        <table className="w-full">
          <thead className="border-t">
            <tr>
              <th className="p-3 font-semibold tracking-wide text-left">
                Nombre
              </th>
              <th className="p-3 font-semibold tracking-wide text-left">
                Apellido
              </th>
              <th className="p-3 font-semibold tracking-wide text-left">
                Edad
              </th>
              <th className="p-3 font-semibold tracking-wide text-left">
                Genero
              </th>
              <th className="p-3 font-semibold tracking-wide text-left">
                Email
              </th>
              <th className="p-3 font-semibold tracking-wide text-left">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr className="text-left border-t border-b" key={user.id}>
                <td className="px-3 py-4 text-sm whitespace-nowrap">
                  {user.name}
                </td>
                <td className="px-3 py-4 text-sm whitespace-nowrap">
                  {user.lastName}
                </td>
                <td className="px-3 py-4 text-sm whitespace-nowrap">
                  {user.age}
                </td>
                <td className="px-3 py-4 text-sm whitespace-nowrap">
                  {user.gender}
                </td>
                <td className="px-3 py-4 text-sm whitespace-nowrap">
                  {user.email}
                </td>
                <td className="px-3 py-4 text-sm whitespace-nowrap">
                  <ButtonLink text="Ver" link={`/users/${user.id}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination totalCount={totalCount} pageSize={pageSize} />
    </>
  );
};

export default UsersPage;
