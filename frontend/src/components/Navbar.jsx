import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const role = session?.user.role;

  return (
    <nav className="p-4 bg-bg-secondary font-bold">
      <div className="container mx-auto flex justify-between">
        <Link href="/">
          <h1 className="text-xl font-bold">Liga de tenis 🎾</h1>
        </Link>

        <ul className="flex gap-x-2">
          {session ? (
            <>
              {role === "ADMIN" ? (
                <li className="px-3 py-1 hover:animate-bounce">
                  <Link href="/users">Usuarios</Link>
                </li>
              ) : null}

              <li className="px-3 py-1 hover:animate-bounce">
                <Link href="/tournaments">Torneos</Link>
              </li>
              <li className="px-3 py-1 hover:animate-bounce">
                <Link href="/profile">Perfil</Link>
              </li>
              <li className="px-3 py-1 hover:animate-bounce">
                <Link href="/api/auth/signout">Salir</Link>
              </li>
            </>
          ) : (
            <>
              <li className="px-3 py-1 hover:animate-bounce">
                <Link href="/login">Ingresar</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
