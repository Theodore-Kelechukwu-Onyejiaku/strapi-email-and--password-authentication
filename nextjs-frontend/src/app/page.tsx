import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-6">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-semibold mb-4">
        Email & Password Authentication in Next.js & Strapi
      </h1>

      {/* Subtitle */}
      <p className="text-center text-lg text-gray-600 max-w-xl">
        Learn how to implement a secure authentication flow using Next.js and
        Strapi. Start by signing in or creating an account.
      </p>

      {/* Buttons */}
      <div className="mt-6 flex space-x-4">
        <Link href="/auth/signin">
          <button className="px-6 py-3 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition">
            Sign In
          </button>
        </Link>
        <Link href="/auth/signup">
          <button className="cursor-pointer px-6 py-3 text-blue-500 border border-blue-500 rounded-lg shadow-md hover:bg-blue-50 transition">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}
