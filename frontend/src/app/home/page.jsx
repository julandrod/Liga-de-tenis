import ButtonLink from "@/components/ButtonLink";
import Link from "next/link";

const HomePage = () => {
  return (
    <section className="container flex flex-col justify-center items-start px-20">
      <div className="text-xl p-8">
        <h2 className="font-bold text-2xl my-8">
          Bienvenido a nuestra plataforma de torneos de tenis
        </h2>
        <p className="leading-loose">
          Gestiona y participa en emocionantes torneos de tenis con facilidad.
          Los administradores pueden organizar eventos, mientras que los
          usuarios regulares disfrutan de una experiencia de registro sin
          complicaciones.
        </p>
      </div>

      <div className="text-xl px-8">
        <h2 className="font-bold text-2xl my-8">Funciones Principales</h2>
        <ul>
          <li className="mb-4">
            <strong>Organización Eficiente:</strong> Los administradores pueden
            gestionar torneos y usuarios de manera eficiente.
          </li>
          <li>
            <strong>Registro Sencillo:</strong> Los usuarios regulares pueden
            registrarse en torneos de forma rápida y sencilla.
          </li>
        </ul>
      </div>

      <div className="text-xl p-8">
        <p className="mb-8">
          ¿Listo para vivir la emoción del tenis? ¡Ingresa ahora!
        </p>
        <ButtonLink link="/login" text="Ingresar" />
      </div>
    </section>
  );
};

export default HomePage;
