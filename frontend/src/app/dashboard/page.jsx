import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { fetchInfo } from "@/libs/data";
import ButtonLink from "@/components/ButtonLink";
import InfoCard from "@/components/InfoCard";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  const role = session?.user.role;
  const accessToken = session?.user.token;
  const page = 1;

  const {
    body: { totalCount: totalUsers },
  } = await fetchInfo({
    accessToken,
    page,
    endpoint: "users",
  });

  const {
    body: { totalCount: totalTournaments },
  } = await fetchInfo({
    accessToken,
    page,
    endpoint: "tournaments",
  });

  const {
    body: { totalCount: totalPayments },
  } = await fetchInfo({
    accessToken,
    page,
    endpoint: "payments",
  });

  if (role !== "ADMIN") {
    return (
      <div>
        <div className="px-8 py-3 mx-6 my-2 text-2xl font-bold">
          <h1>No tienes permiso para ver esta pagina</h1>
          <ButtonLink link="/" text="Ir al inicio" />
        </div>
        , pageSize
      </div>
    );
  }

  return (
    <section className="container flex flex-col justify-center items-center">
      <div className="px-8 py-3 mx-6 my-2 text-2xl font-bold">
        <h1>Dashboard Administrador</h1>
      </div>
      <div>
        <InfoCard
          title="Total usuarios registrados:"
          data={totalUsers}
          buttons={[{ title: "Ver lista usuarios", route: "/users" }]}
        />
        <InfoCard
          title="Total torneos creados:"
          data={totalTournaments}
          buttons={[
            { title: "Ver lista torneos", route: "/tournaments" },
            { title: "Crear nuevo torneo", route: "/tournaments/create" },
          ]}
        />
        <InfoCard
          title="Total pagos registrados:"
          data={totalPayments}
          buttons={[{ title: "Ver lista pagos", route: "/dashboard/payments" }]}
        />
      </div>
    </section>
  );
};

export default DashboardPage;
