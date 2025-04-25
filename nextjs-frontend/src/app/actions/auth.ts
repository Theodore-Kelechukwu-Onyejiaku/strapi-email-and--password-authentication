"use server";

import { redirect } from "next/navigation";
import { FormState, Credentials } from "../lib/definitions";
import {
  signUpRequest,
  confirmEmailRequest,
  signInRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
  changePasswordRequest,
} from "../lib/requests";
import { createSession, deleteSession } from "../lib/session";

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
  redirect("/auth/confirm-email?email=" + email);
}

export async function resendConfirmEmailAction(
  initialState: FormState,
  formData: FormData
) {
  // Extract email from formData
  const email = formData.get("email");

  // Validate the email
  if (!email) {
    return {
      values: { email } as Credentials,
      message: "Email not found",
      success: false,
    };
  }

  // invoke the resend email function
  const res = await confirmEmailRequest(email as string);

  // Check for errors in the response
  if (res.statusText !== "OK") {
    return {
      errors: {} as Credentials,
      values: { email } as Credentials,
      message: res?.statusText || res,
      success: false,
    };
  }

  return {
    values: { email } as Credentials,
    message: "Confirmation email sent",
    success: true,
  };
}

export async function signinAction(
  initialState: FormState,
  formData: FormData
): Promise<FormState> {
  // Convert formData into an object to extract data
  const identifier = formData.get("identifier");
  const password = formData.get("password");

  const errors: Credentials = {};

  if (!identifier) errors.identifier = "Username or email is required";
  if (!password) errors.password = "Password is required";

  if (errors.password || errors.identifier) {
    return {
      errors,
      values: { identifier, password } as Credentials,
      message: "Error submitting form",
      success: false,
    };
  }

  // Call backend API
  const res: any = await signInRequest({
    identifier,
    password,
  } as Credentials);

  if (res.statusText !== "OK") {
    return {
      errors: {} as Credentials,
      values: { identifier, password } as Credentials,
      message: res?.statusText || res,
      success: false,
    };
  }

  // create session for user
  await createSession(res.data);

  redirect("/profile");
}
// Logout action
export async function logoutAction() {
  await deleteSession();
  redirect("/");
}

export async function forgotPasswordAction(
  initialState: FormState,
  formData: FormData
): Promise<FormState> {
  // Get email from form data
  const email = formData.get("email");

  const errors: Credentials = {};

  // Validate the form data
  if (!email) errors.email = "Email is required";
  if (errors.email) {
    return {
      errors,
      values: { email } as Credentials,
      message: "Error submitting form",
      success: false,
    };
  }

  // Reqest password reset link
  const res: any = await forgotPasswordRequest(email as string);

  if (res.statusText !== "OK") {
    return {
      errors: {} as Credentials,
      values: { email } as Credentials,
      message: res?.statusText || res,
      success: false,
    };
  }

  return {
    errors: {} as Credentials,
    values: { email } as Credentials,
    message: "Password reset email sent",
    success: true,
  };
}

export async function resetPasswordAction(
  initialState: FormState,
  formData: FormData
): Promise<FormState> {
  const password = formData.get("password"); // password
  const code = formData.get("code"); // code
  const confirmPassword = formData.get("confirmPassword"); // confirm password

  const errors: Credentials = {};

  if (!password) errors.password = "Password is required";
  if (!confirmPassword) errors.confirmPassword = "Confirm password is required";
  if (!code) errors.code = "Error resetting password";
  if (password && confirmPassword && password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: { password, confirmPassword, code } as Credentials,
      message: "Error submitting form",
      success: false,
    };
  }

  // Call backend API
  const res: any = await resetPasswordRequest({
    code,
    password,
    confirmPassword,
  } as Credentials);

  if (res?.statusText !== "OK") {
    return {
      errors: {} as Credentials,
      values: { password, confirmPassword, code } as Credentials,
      message: res?.statusText || res,
      success: false,
    };
  }

  return {
    errors: {} as Credentials,
    values: {} as Credentials,
    message: "Reset password successful!",
    success: true,
  };
}

export async function changePasswordAction(
  initialState: FormState,
  formData: FormData
): Promise<FormState> {
  // Convert formData into an object to extract data
  const password = formData.get("password");
  const newPassword = formData.get("newPassword");
  const confirmPassword = formData.get("confirmPassword");

  const errors: Credentials = {};

  if (!password) errors.password = "Current Password is required";
  if (!confirmPassword) errors.confirmPassword = "Confirm password is required";
  if (!newPassword) errors.newPassword = "New password is required";
  if (confirmPassword !== newPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: { password, confirmPassword, newPassword } as Credentials,
      message: "Error submitting form",
      success: false,
    };
  }

  // Call backend API
  const res: any = await changePasswordRequest({
    password,
    newPassword,
    confirmPassword,
  } as Credentials);

  if (res?.statusText !== "OK") {
    return {
      errors: {} as Credentials,
      values: { password, confirmPassword, newPassword } as Credentials,
      message: res?.statusText || res,
      success: false,
    };
  }

  return {
    errors: {} as Credentials,
    values: {} as Credentials,
    message: "Reset password successful!",
    success: true,
  };
}
