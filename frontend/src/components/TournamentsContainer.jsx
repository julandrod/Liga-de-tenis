import CardTournament from "@/components/CardTournament";
import Pagination from "./Pagination";
import ButtonLink from "./ButtonLink";

const TournamentsContainer = ({
  title,
  tournaments,
  totalCount,
  pageSize,
  isMyProfile,
}) => {
  if (tournaments?.length === 0) {
    return (
      <div className="px-8 py-3 mx-6 my-2 text-2xl font-bold">
        <h1>No hay torneos registrados aun </h1>
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
