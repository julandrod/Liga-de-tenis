"use client";
import { fetchDeleteUser } from "@/libs/data";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const DeleteButton = ({ text, id, accessToken, routeToReturn }) => {
  const router = useRouter();

  const handleDelete = async (id) => {
    const res = await fetchDeleteUser({ accessToken, id });

    if (res === 200) {
      Swal.fire({
        icon: "success",
        title: "Usuario eliminado!",
        text: "Se ha eliminado la informacion del usuario",
        allowEscapeKey: false,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          return router.push(routeToReturn);
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: res,
      });
    }
  };

  return (
    <button
      onClick={() => handleDelete(id)}
      className="inline-block ml-2 px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:border-red-900 hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
    >
      {text}
    </button>
  );
};

export default DeleteButton;
