import Link from "next/link";

/**
 * Render a custom button component, can be a link button or onClick button
 * @param {Object}    props
 * @param {String}    props.link      The link to navigate to
 * @param {String}    props.text      Text to show in the button
 * @param {Function}  props.onClick   The function to call when the button is clicked
 * @param {Boolean}   props.disabled  Whether the button is disabled
 * @returns Custom button component
 */

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
