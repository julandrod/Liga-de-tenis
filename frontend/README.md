# 🖵 Frontend - Liga de Tenis

Frontend construido usando Next.Js 14, se implemento la autenticación utilizando NextAuth. Esta biblioteca facilita la protección de rutas y proporciona una solución robusta para la gestión de sesiones y autenticación.

Para la gestión eficiente de formularios, se ha integrado Formik en el frontend. Formik simplifica la creación y validación de formularios, proporcionando una experiencia de usuario fluida y permitiendo concentrarse en la lógica esencial de la aplicación.

Se incorporo Yup como herramienta de validacion de datos, este permite establecer reglas claras y concisas para la entrada de datos.

Para la maquetacion y estilizacion se uso Tailwind CSS.

## 🛠 Tech Stack

![image](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
) ![image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![image](https://img.shields.io/badge/Next%20Auth-000010?style=for-the-badge&logo=nextdotjs&logoColor=white) ![image](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
) ![image](https://img.shields.io/badge/Formik-666766?style=for-the-badge
) ![image](https://img.shields.io/badge/YUP-666766?style=for-the-badge
)

## Environment Variables

Para ejecutar este proyecto se necesitan las siguientes variables que se deben agregar al archivo .env

`NEXTAUTH_URL`: url en la que corre el frontend, solo se usa en local

`NEXTAUTH_SECRET`: palabra secreta que usa Next-Auth para la gestion de sessiones

`NEXT_PUBLIC_API_URL`: url en la que corre la API de nuestro backend

`NEXT_PUBLIC_PAYPAL_CLIENT_ID`: client id generado por Paypal

## 💻 Ejecutar localmente

Clonar el proyecto

```bash
  git clone https://github.com/julandrod/liga-de-tenis.git
```

Ir al directorio del proyecto

```bash
  cd liga-de-tenis
  cd frontend
```

Instalar las dependencias

```bash
  npm install
```

Ejecutar el proyecto

```bash
  npm run dev
```

