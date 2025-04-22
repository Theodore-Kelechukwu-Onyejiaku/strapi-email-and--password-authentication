import Link from "next/link";

export default function EmailConfirmed() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold text-green-600">
          Email Confirmed ✅
        </h2>

        <p className="text-gray-700 text-sm">
          Your email has been successfully verified. You can now log in to your
          account.
        </p>

        <Link href="/auth/login">
          <button className="mt-6 w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Go to Login
          </button>
        </Link>
      </div>
    </div>
  );
}
