import CardTournament from "@/components/CardTournament";
import Pagination from "./Pagination";
import ButtonLink from "./ButtonLink";

/**
 * Render a container component with a title and a list of tournaments
 * @param {Object} props
 * @param {String} props.title Title of the container 
 * @param {Object[]} props.tournaments List of tournaments
 * @param {Number} props.totalCount Total count of tournaments
 * @param {Number} props.pageSize Page size of the pagination
 * @param {Boolean} props.isMyProfile Whether the container is for the current user's profile
 * @returns Container component
 */

const TournamentsContainer = ({
  title,
  tournaments,
  totalCount,
  pageSize,
  isMyProfile,
}) => {
  if (!tournaments || tournaments?.length === 0) {
    return (
      <div className="px-8 py-3 mx-6 my-2 text-2xl font-bold">
        <h1>No hay torneos registrados</h1>
        <ButtonLink
          text="Volver"
          link={`${isMyProfile ? "/profile" : "/tournaments"}`}
        />
      </div>
    );
  }

  return (
    <section className="container">
      <div className="px-8 py-3 mx-6 my-2 text-2xl font-bold">
        <h1>{title}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-1 gap-y-6">
        {tournaments?.map(({ id, name, description, startDate, endDate }) => (
          <CardTournament
            key={id}
            id={id}
            name={name}
            description={description}
            startDate={startDate}
            endDate={endDate}
          />
        ))}
      </div>
      {!isMyProfile ? (
        <Pagination totalCount={totalCount} pageSize={pageSize} />
      ) : null}
    </section>
  );
};

export default TournamentsContainer;
