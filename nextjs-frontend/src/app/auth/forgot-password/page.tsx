"use client";

import React, { useActionState, useEffect } from "react";
import { forgotPasswordAction } from "@/app/actions/auth";
import { FormState } from "@/app/lib/definitions";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const initialState: FormState = {
    errors: {},
    values: {},
    message: "",
    success: false,
  };

  const [state, formAction, isPending] = useActionState(
    forgotPasswordAction,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message, { position: "top-center" });
    }
  }, [state]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center">Forgot Password</h2>
        <p className="text-sm text-gray-600 text-center">
          Enter your email and we'll send you a link to reset your password.
        </p>
        <form action={formAction} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={state.values?.email}
              placeholder="your@email.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">{state.errors?.email}</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full cursor-pointer py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
          >
            {isPending ? "Submitting..." : "Send Reset Link"}
          </button>
        </form>

        {/* Back to Sign In */}
        <p className="text-center text-gray-600 text-sm">
          Remembered your password?{" "}
          <a href="/auth/login" className="text-blue-500 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
