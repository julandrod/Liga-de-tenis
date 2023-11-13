import Link from "next/link";

const ButtonLink = ({ link, text, onClick, disabled }) => {
  if (!link) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className="inline-block ml-2 px-6 py-2 border-2 border-teal-600 text-teal-600 font-medium text-xs leading-tight uppercase rounded hover:border-orange-400 hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
      >
        {text}
      </button>
    );
  }

  return (
    <Link
      href={link}
      className="inline-block ml-2 px-6 py-2 border-2 border-teal-600 text-teal-600 font-medium text-xs leading-tight uppercase rounded hover:border-orange-400 hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
    >
      {text}
    </Link>
  );
};

export default ButtonLink;
