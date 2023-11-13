"use client";

import InputForm from "@/components/InputForm";
import { loginSchema } from "@/libs/validateSchemas";
import { Form, Formik } from "formik";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const LoginPage = () => {
  const { data, status } = useSession();
  const router = useRouter();

  const handleSubmit = async (values, actions) => {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (res?.error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: res.error,
      });
    }

    if (res?.ok) {
      Swal.fire({
        icon: "success",
        title: "Ingreso exitoso!",
        text: "Ahora puedes volver a la pagina principal",
        allowEscapeKey: false,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          return router.push("/");
        }
      });
    }
    actions.resetForm();
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (data?.user) {
    return router.push("/");
  }

  return (
    <div className="lg:flex lg:flex-wrap w-[1000px] g-0 ">
      <div className="lg:w-6/12 px-4 md:px-0">
        <div className="md:p-12 md:mx-6">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {(props) => (
              <Form>
                <h3 className="mb-5 text-2xl font-bold text-center">
                  Ingresa a tu cuenta
                </h3>

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
                    ¿No tienes una cuenta?
                    <Link
                      href="/register"
                      className="inline-block ml-2 px-6 py-2 border-2 border-teal-600 text-teal-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    >
                      Registrate
                    </Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="bg-[url('/tennis.jpg')] bg-cover hidden lg:flex lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none">
        <div className="bg-primary-dark bg-cover bg-opacity-70 lg:w-full h-[-webkit-fill-available] flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none">
          <div className=" px-4 py-6 md:p-12 md:mx-6" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
