import Swal from "sweetalert2";

/**
 * Show an alert window using sweetalert window with info pass through props
 * @param {Object}  props
 * @param {String}  props.title Title to show in the alert window
 * @param {Text}    props.text Text to show in the alert window
 * @param {Object}  props.response Object with the response from the API
 * @param {Integer} props.code Code to compare with the response
 * @returns A sweet alert window with the response
 */

export const alertMessage = async ({ title, text, response, code }) => {
  if (response === code) {
    const result = await Swal.fire({
      icon: "success",
      title,
      text,
      allowEscapeKey: false,
      allowOutsideClick: false,
    });
    if (result.isConfirmed) return true;
  } else {
    const result = await Swal.fire({
      icon: "error",
      title: "Oops...",
      text: response,
    });
    if (result.isConfirmed) return false;
  }
};
