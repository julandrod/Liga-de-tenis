"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data, status } = useSession();

  return (
    <nav className="p-4 bg-bg-secondary font-bold">
      <div className="container mx-auto flex justify-between">
        <Link href="/">
          <h1 className="text-xl font-bold">Liga de tenis 🎾</h1>
        </Link>

        <ul className="flex gap-x-2">
          {data?.user ? (
            <>
              {data?.user.role === "ADMIN" ? (
                <li className="px-3 py-1 hover:animate-bounce">
                  <Link href="/dashboard">Dashboard</Link>
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
