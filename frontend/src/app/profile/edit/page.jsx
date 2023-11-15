"use client";
import InputForm from "@/components/InputForm";
import { fetchUpdateUser } from "@/libs/data";
import { registerSchema } from "@/libs/validateSchemas";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const EditProfilePage = ({ searchParams }) => {
  const router = useRouter();

  const handleSubmit = async (values, actions) => {
    const res = await fetchUpdateUser({
      accessToken: searchParams?.token,
      id: searchParams?.id,
      name: values.name,
      lastName: values.lastName,
      age: values.age,
      gender: values.gender,
      email: values.email,
    });

    if (res === 200) {
      Swal.fire({
        icon: "success",
        title: "Actualizacion Exitosa!",
        text: "Ahora todos tus datos estan actualizados",
        allowEscapeKey: false,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          return router.push("/profile");
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: res,
      });
    }
    actions.resetForm();
  };

  return (
    <>
      <div className="px-8 py-3 mx-6 mt-6 text-2xl font-bold">
        <h1>Informacion de mi perfil</h1>
      </div>
      <div className="md:p-12 md:mx-6">
        <Formik
          initialValues={{
            name: searchParams?.name,
            lastName: searchParams?.lastName,
            age: searchParams?.age,
            gender: searchParams?.gender,
            email: searchParams?.email,
          }}
          // validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form>
              <h3 className="mb-2 text-2xl font-bold text-center">
                Por favor ingresa los datos a actualizar
              </h3>
              <InputForm
                labelText="Nombre:"
                type="text"
                placeholder="Nombre..."
                name="name"
              />
              <InputForm
                labelText="Apellido:"
                type="text"
                placeholder="Apellido..."
                name="lastName"
              />
              <InputForm
                labelText="Edad:"
                type="number"
                placeholder="edad..."
                name="age"
              />
              <div className="mb-4">
                <label className="block mt-3">Genero:</label>
                <Field
                  as="select"
                  name="gender"
                  className="block w-80 md:w-52 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                >
                  <option disabled>-- Selecciona un genero -- </option>
                  <option value="MALE">Masculino</option>
                  <option value="FEMALE">Femenino</option>
                </Field>
              </div>
              <InputForm
                labelText="Email:"
                type="email"
                placeholder="Email..."
                name="email"
              />
              <div className="text-center pt-1 mb-12 pb-1">
                <button
                  type="submit"
                  className="mt-2 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
                  disabled={props.isSubmitting}
                >
                  Actualizar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default EditProfilePage;
