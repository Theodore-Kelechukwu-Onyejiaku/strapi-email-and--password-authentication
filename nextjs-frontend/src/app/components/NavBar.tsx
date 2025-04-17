import Link from "next/link";

export default async function NavBar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo */}
      <Link href="/" className="text-xl font-semibold cursor-pointer">
        MyApp
      </Link>
      <div className="flex">
        <Link
          href="/auth/signin"
          className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium shadow-md transition-transform transform hover:scale-105 hover:bg-blue-600 cursor-pointer"
        >
          Sign-in
        </Link>
      </div>
    </nav>
  );
}
