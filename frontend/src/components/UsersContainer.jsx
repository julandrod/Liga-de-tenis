import ButtonLink from "./ButtonLink";
import Pagination from "./Pagination";

/**
 * Render a container component with a title, users, and pagination.
 * @param {Object} props
 * @param {String} props.title The title to display
 * @param {Object[]} props.users An array of users
 * @param {Number} props.totalCount The total number of users
 * @param {Number} props.pageSize The number of users per page 
 * @returns Container component
 */

const UsersContainer = ({ title, users, totalCount, pageSize }) => {
  if (!users || users?.length === 0) {
    return (
      <div className="px-8 py-3 mx-6 my-2 text-2xl font-bold">
        <h1>No hay usuarios registrados</h1>
        <ButtonLink text="Ir al inicio" link="/" />
      </div>
    );
  }

  return (
    <section className="container">
      <div className="px-8 py-3 mx-6 my-2 text-2xl font-bold">
        <h1>{title}</h1>
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
    </section>
  );
};

export default UsersContainer;
