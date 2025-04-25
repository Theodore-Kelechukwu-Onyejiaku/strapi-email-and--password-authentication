"use client";

import { useActionState } from "react";
import { signupAction } from "@/app/actions/auth";
import { FormState } from "@/app/lib/definitions";

export default function SignUp() {
  // create a form state
  const initialState: FormState = {
    errors: {},
    values: {},
    message: "",
    success: false,
  };

  // use the action state to handle the form submission
  const [state, formAction, isPending] = useActionState(
    signupAction,
    initialState
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center">Sign Up</h2>

        <form action={formAction} className="space-y-4">
          <p className="text-red-500 text-center text-sm">
            {!state?.success && state?.message}
          </p>

          {/* Email */}
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              defaultValue={state?.values?.username as string}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state?.errors.username && (
              <p className="text-red-500 text-sm">{state?.errors.username}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={state?.values?.email as string}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {state?.errors.email && (
              <p className="text-red-500 text-sm">{state?.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              defaultValue={state?.values?.password as string}
              placeholder="Create a password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {state?.errors.password && (
              <p className="text-red-500 text-sm">{state?.errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              defaultValue={state?.values?.confirmPassword as string}
              placeholder="Confirm your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {state?.errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {state?.errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
          >
            {isPending ? "Submitting..." : "Sign Up"}
          </button>
        </form>

        {/* Sign In Link */}
        <div className="text-center text-gray-600">
          Already have an account?{" "}
          <a href="/auth/login" className="text-blue-500 hover:underline">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
