"use client";

import { resendConfirmEmailAction } from "@/app/actions/auth";
import { FormState } from "@/app/lib/definitions";

import { useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";

import { toast } from "react-toastify";

export default function PleaseConfirmEmail() {
  // create initial state
  const initialState: FormState = {
    errors: {},
    values: {},
    message: "",
    success: false,
  };

  // useActionState to manage the state of the action
  const [state, formAction, isPending] = useActionState(
    resendConfirmEmailAction,
    initialState
  );

  // useSearchParams to get the email from the URL
  const searchParams = useSearchParams();
  const userEmail = searchParams.get("email") || "";

  useEffect(() => {
    if (state.success) {
      toast.success(state.message, { position: "top-center" });
    }
  }, [state.success]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold">Confirm Your Email</h2>
        <p className="text-red-500">{!state.success && state.message}</p>
        <p className="text-gray-700 text-sm">
          We’ve sent a confirmation link to your email address. Please check
          your inbox and click the link to verify your account before logging
          in.
        </p>

        <p className="text-gray-500 text-sm">
          Didn’t receive the email? Check your spam folder or try resending it
          below.
        </p>

        {/* Resend Email Button */}
        <form action={formAction}>
          <input
            type="email"
            name="email"
            defaultValue={userEmail || state?.values?.email}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            disabled={isPending}
            type="submit"
            className="w-full my-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Resend Confirmation Email
          </button>
        </form>
      </div>
    </div>
  );
}
