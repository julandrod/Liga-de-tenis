"use client";
import { Form, Formik } from "formik";
import InputForm from "./InputForm";
import { useRouter } from "next/navigation";
import { createTournament } from "@/libs/data";
import { alertMessage } from "./AlertMessage";

/**
 * Render a custom form using Formik to create a tournament
 * @param {Object} props
 * @param {String} props.accessToken Access token to authenticate the request 
 * @param {String} props.title Title of the form 
 * @returns Custom Formik form
 */

const CreateTournament = ({ accessToken, title }) => {
  const router = useRouter();

  const handleSubmit = async (values, actions) => {
    const isoStartDate = new Date(values.startDate).toISOString();
    const isoEndDate = new Date(values.endDate).toISOString();

    const res = await createTournament({
      accessToken,
      name: values.name,
      description: values.description,
      startDate: isoStartDate,
      endDate: isoEndDate,
    });

    const successResponse = await alertMessage({
      title: "Torneo creado!",
      text: "El nuevo torneo ha sido creado",
      response: res,
      code: 201,
    });

    if (successResponse) router.push("/tournaments");

    actions.resetForm();
  };

  return (
    <>
      <div className="px-8 py-3 mx-6 mt-6 text-2xl font-bold">
        <h1>{title}</h1>
      </div>
      <div className="md:p-12 md:mx-6">
        <Formik
          initialValues={{
            name: "",
            description: "",
            startDate: "",
            endDate: "",
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
                labelText="Nombre del torneo:"
                type="text"
                placeholder="Nombre..."
                name="name"
              />
              <InputForm
                labelText="Descripcion:"
                type="text"
                placeholder="Descripcion..."
                name="description"
              />
              <InputForm
                labelText="Inicia:"
                type="date"
                placeholder="Fecha..."
                name="startDate"
                required
              />
              <InputForm
                labelText="Termina:"
                type="date"
                placeholder="Fecha..."
                name="endDate"
                required
              />
              <div className="text-center pt-1 mb-12 pb-1">
                <button
                  type="submit"
                  className="mt-2 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
                  disabled={props.isSubmitting}
                >
                  Crear
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CreateTournament;
