export default function ConfirmEmail() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold">Confirm Your Email</h2>
        <p className="text-gray-700 text-sm">
          We’ve sent a confirmation link to your email address. Please check
          your inbox and click the link to verify your account before logging
          in.
        </p>
      </div>
    </div>
  );
}
