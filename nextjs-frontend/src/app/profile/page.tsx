import Link from "next/link";
import LogOutButton from "@/app/components/LogOutButton";

export default async function Profile() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center space-y-6">
        {/* Username */}
        <p className="text-xl font-semibold text-gray-800 capitalize">
          Welcome, John Doe!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/auth/change-password"
            className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Change Password
          </Link>
          <LogOutButton />
        </div>
      </div>
    </div>
  );
}
