"use client";

import InputForm from "@/components/InputForm";
import { registerUser } from "@/libs/data";
import { registerSchema } from "@/libs/validateSchemas";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const router = useRouter();

  const handleSubmit = async (values, actions) => {
    const res = await registerUser({
      name: values.name,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    });

    if (res === 201) {
      Swal.fire({
        icon: "success",
        title: "Registro exitoso!",
        text: "Ahora puedes ingresar con tus datos",
        allowEscapeKey: false,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          return router.push("/login");
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
    <div className="lg:flex lg:flex-wrap w-[1000px] g-0">
      <div className="bg-[url('/tennis2.jpg')] bg-cover hidden lg:flex lg:w-6/12 items-center lg:rounded-l-lg rounded-b-rg lg:rounded-br-none">
        <div className="bg-primary-dark bg-cover bg-opacity-70 lg:w-full h-[-webkit-fill-available] flex items-center lg:rounded-l-lg rounded-b-lg lg:rounded-bl-none">
          <div className=" px-4 py-6 md:p-12 md:mx-6" />
        </div>
      </div>
      <div className="lg:w-6/12 px-4 md:px-0">
        <div className="md:p-12 md:mx-6">
          <Formik
            initialValues={{
              name: "",
              lastName: "",
              email: "",
              password: "",
            }}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}
          >
            {(props) => (
              <Form>
                <h3 className="mb-2 text-2xl font-bold text-center">
                  Por favor ingresa los datos para crear tu cuenta
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
                  labelText="Email:"
                  type="email"
                  placeholder="Email..."
                  name="email"
                />
                <InputForm
                  labelText="Password:"
                  type="password"
                  placeholder="Password"
                  name="password"
                />

                <div className="text-center pt-1 mb-12 pb-1">
                  <button
                    type="submit"
                    className="mt-2 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
                    disabled={props.isSubmitting}
                  >
                    Ingresa
                  </button>
                </div>
                <div className="flex items-center justify-between pb-2">
                  <p>
                    ¿Ya tienes cuenta?
                    <Link
                      href="/login"
                      className="inline-block ml-2 px-6 py-2 border-2 border-teal-600 text-teal-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    >
                      Ingresa
                    </Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
