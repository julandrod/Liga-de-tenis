import Swal from "sweetalert2";

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
