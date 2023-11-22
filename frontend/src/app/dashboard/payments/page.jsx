import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ButtonLink from "@/components/ButtonLink";
import PaymentsContainer from "@/components/PaymentsContainer";
import { fetchInfo } from "@/libs/data";
import { getServerSession } from "next-auth";
clear

const PaymentsPage = async ({ searchParams }) => {
  const page = searchParams?.page || 1;
  const session = await getServerSession(authOptions);
  const accessToken = session?.user.token;
  const role = session?.user.role;

  const {
    body: { payments, pageSize, totalCount },
  } = await fetchInfo({ accessToken, page, endpoint: "payments" });

  if (role === "PLAYER") {
    return (
      <div className="px-8 py-3 mx-6 my-2 text-2xl font-bold">
        <h1>No tienes permiso para ver esta pagina</h1>
        <ButtonLink link="/" text="Ir al inicio" />
      </div>
    );
  }

  return (
    <PaymentsContainer
      title="Pagos"
      payments={payments}
      totalCount={totalCount}
      pageSize={pageSize}
    />
  );
};

export default PaymentsPage;
