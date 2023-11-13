import * as yup from "yup";

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Debe tener al menos 3 caracteres")
    .required("Debe ingresar un nombre"),
  lastName: yup
    .string()
    .min(3, "Debe tener al menos 3 caracteres")
    .required("Debe ingresar un apellido"),
  email: yup
    .string()
    .email("Por favor ingrese un email valido")
    .required("Debe ingresar un email"),
  password: yup
    .string()
    .min(4, "Debe tener al menos 4 caracteres")
    .max(15, "Debe tener maximo 15 caracteres")
    .required("Debe ingresar un password"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Por favor ingrese un email valido")
    .required("Debe ingresar un email"),
  password: yup
    .string()
    .min(4, "Debe tener al menos 4 caracteres")
    .max(15, "Debe tener maximo 15 caracteres")
    .required("Debe ingresar un password"),
});