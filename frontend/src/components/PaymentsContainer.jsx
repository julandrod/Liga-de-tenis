import ButtonLink from "./ButtonLink";
import Pagination from "./Pagination";
import formatDate from "@/libs/formatDate";

/**
 * Render a container component with a title and a list of payments
 * @param {Object} props
 * @param {String} props.title The title of the container
 * @param {Object[]} props.payments The list of payments to render
 * @param {Number} props.totalCount The total number of payments
 * @param {Number} props.pageSize The number of payments per page 
 * @returns Container component
 */

const PaymentsContainer = ({ title, payments, totalCount, pageSize }) => {
  if (!payments || payments?.length === 0) {
    return (
      <div className="px-8 py-3 mx-6 my-2 text-2xl font-bold">
        <h1>No hay pagos registrados</h1>
        <ButtonLink text="Ir al inicio" link="/" />
      </div>
    );
  }

  const shortText = (text) => {
    return text.length > 10 ? text.slice(0, 10) + "..." : text;
  };

  return (
    <section className="container">
      <div className="px-8 py-3 mx-6 my-2 text-2xl font-bold">
        <h1>{title}</h1>
      </div>
      <div className="flex mb-6 text-xs">
        <table className="w-full">
          <thead className="border-t">
            <tr>
              <th className="p-3 font-semibold tracking-wide text-left">Id</th>
              <th className="p-3 font-semibold tracking-wide text-left">
                PlayerId
              </th>
              <th className="p-3 font-semibold tracking-wide text-left">
                TournamentId
              </th>
              <th className="p-3 font-semibold tracking-wide text-left">
                Paypal PayerId
              </th>
              <th className="p-3 font-semibold tracking-wide text-left">
                PaymentId
              </th>
              <th className="p-3 font-semibold tracking-wide text-left">
                Fecha de pago
              </th>
            </tr>
          </thead>
          <tbody>
            {payments?.map((payment) => (
              <tr className="text-left border-t border-b" key={payment.id}>
                <td className="px-3 py-4 text-sm whitespace-nowrap">
                  {shortText(payment.id)}
                </td>
                <td className="px-3 py-4 text-sm whitespace-nowrap">
                  {shortText(payment.playerId)}
                </td>
                <td className="px-3 py-4 text-sm whitespace-nowrap">
                  {shortText(payment.tournamentId)}
                </td>
                <td className="px-3 py-4 text-sm whitespace-nowrap">
                  {shortText(payment.paypalPayerId)}
                </td>
                <td className="px-3 py-4 text-sm whitespace-nowrap">
                  {shortText(payment.paymentId)}
                </td>
                <td className="px-3 py-4 text-sm whitespace-nowrap">
                  {formatDate(payment.createdAt)}
                </td>
                <td className="px-3 py-4 text-sm whitespace-nowrap">
                  <ButtonLink
                    text="Ver"
                    link={`/dashboard/payments/${payment.id}`}
                  />
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

export default PaymentsContainer;
