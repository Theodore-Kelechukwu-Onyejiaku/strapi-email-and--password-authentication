"use client";

import React, { useActionState, useEffect } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { changePasswordAction } from "@/app/actions/auth";
import { FormState } from "@/app/lib/definitions";
import { toast } from "react-toastify";

export default function ResetPassword() {

  const initialState: FormState = {
    errors: {},
    values: {},
    message: "",
    success: false,
  };

  const [state, formAction, IsPending] = useActionState(
    changePasswordAction,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message, { position: "top-center" });
      redirect("/profile");
    }
  }, [state.success]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold">Change Password</h2>

        <p className="text-gray-600 text-sm">
          Enter your new password below to update your credentials.
        </p>

        <form action={formAction} className="space-y-4 text-left">
          <p className="text-red-500 text-center text-sm">
            {!state?.success && state?.message}
          </p>

          {/* Current Password */}
          <div>
            <label className="block text-gray-700 mb-1">Current Password</label>
            <input
              type="password"
              name="password"
              defaultValue={state.values?.password}
              placeholder="Enter current password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state?.errors.password && (
              <p className="text-red-500 text-sm">{state?.errors.password}</p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              name="newPassword"
              defaultValue={state.values?.newPassword}
              placeholder="Enter new password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state?.errors.newPassword && (
              <p className="text-red-500 text-sm">
                {state?.errors.newPassword}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              defaultValue={state.values?.confirmPassword}
              placeholder="Confirm new password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state?.errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {state?.errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Reset Password Button */}
          <button
            type="submit"
            disabled={IsPending}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}
