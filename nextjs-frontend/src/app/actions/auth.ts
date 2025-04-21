"use server";

import { redirect } from "next/navigation";
import { FormState, Credentials } from "../lib/definitions";
import { signUpRequest } from "../lib/requests";

export interface SignUpResponse {
  signupError: string;
  signupSuccess: string;
}

export async function signupAction(
  initialState: FormState,
  formData: FormData
): Promise<FormState> {
  // Convert formData into an object to extract data
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  const errors: Credentials = {};

  // Validate the form data
  if (!username) errors.username = "Username is required";
  if (!username) errors.email = "Email is required";
  if (!password) errors.password = "Password is required";
  if (!confirmPassword) errors.confirmPassword = "Confirm password is required";
  if (password && confirmPassword && password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  // Check if there are any errors
  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: { username, email, password, confirmPassword } as Credentials,
      message: "Error submitting form",
      success: false,
    };
  }

  // Call backend API
  const res: any = await signUpRequest({
    username,
    email,
    password,
  } as Credentials);

  // Check for errors in the response
  if (res.statusText !== "OK") {
    return {
      errors: {} as Credentials,
      values: { username, email, password, confirmPassword } as Credentials,
      message: res?.statusText || res,
      success: false,
    };
  }

  // redirect to confirm email
  redirect("/auth/confirm-email");
}
