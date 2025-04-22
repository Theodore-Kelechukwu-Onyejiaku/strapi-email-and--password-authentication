"use client";

import { useActionState } from "react";

import { signinAction } from "@/app/actions/auth";
import { FormState } from "@/app/lib/definitions";
import { toast } from "react-toastify";

export default function SignIn() {
  const initialState: FormState = {
    errors: {},
    values: {},
    message: "",
    success: false,
  };

  const [state, formAction, isPending] = useActionState(
    signinAction,
    initialState
  );

  if (state.success) {
    toast.success(state.message, { position: "top-center" });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center">Sign In</h2>

        <form action={formAction} className="space-y-4">
          <p className="text-red-500 text-center text-sm">
            {!state?.success && state?.message}
          </p>

          {/* Email */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="identifier"
              defaultValue={state?.values?.identifier}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state?.errors.identifier && (
              <p className="text-red-500 text-sm">{state?.errors.identifier}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              defaultValue={state?.values.password}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state?.errors.password && (
              <p className="text-red-500 text-sm">{state?.errors.password}</p>
            )}
            <div className="text-right mt-1">
              <a
                href="/auth/forgot-password"
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot password?
              </a>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
            disabled={isPending}
          >
            Sign In
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <a href="/auth/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
