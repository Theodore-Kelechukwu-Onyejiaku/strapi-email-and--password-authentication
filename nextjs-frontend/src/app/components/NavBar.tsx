import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { verifySession } from "../lib/dal";
import LogOutButton from "./LogOutButton";

export default async function Navbar() {
  const { isAuth }: any = await verifySession();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo */}
      <Link href="/" className="text-xl font-semibold cursor-pointer">
        MyApp
      </Link>
      <div className="flex">
        {isAuth ? (
          <LogOutButton />
        ) : (
          <Link
            href="/auth/login"
            className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium shadow-md transition-transform transform hover:scale-105 hover:bg-blue-600 cursor-pointer"
          >
            Sign-in
          </Link>
        )}
      </div>
    </nav>
  );
}
