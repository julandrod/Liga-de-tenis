/**
 * Render a container (label and text) to show info
 * @param {Object} props
 * @param {String} props.label Label to show 
 * @param {String} props.info Info to show 
 * @returns Custom container with label and text
 */

const InfoContainer = ({ label, info }) => {
  return (
    <div className="flex flex-col px-1 py-2">
      <h3 className="mx-6 my-2 p-2">{label}</h3>
      <div className="bg-bg-primary mx-6 p-2 rounded-md w-auto">
        <h1>{info === null ? "Aun no se registra este campo" : info }</h1>
      </div>
    </div>
  );
};

export default InfoContainer;
