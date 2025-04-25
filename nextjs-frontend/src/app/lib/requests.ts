import { verifySession } from "./dal";
import { Credentials } from "./definitions";
import axios from "axios";

const STRAPI_ENDPOINT = process.env.STRAPI_ENDPOINT || "http://localhost:1337";

export const signUpRequest = async (credentials: Credentials) => {
  try {
    const response = await axios.post(
      `${STRAPI_ENDPOINT}/api/auth/local/register`,
      {
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
      }
    );

    return response;
  } catch (error: any) {
    return error?.response?.data?.error?.message || "Error signing up";
  }
};

export const confirmEmailRequest = async (email: string) => {
  try {
    const response = await axios.post(
      `${STRAPI_ENDPOINT}/api/auth/send-email-confirmation`,
      {
        email,
      }
    );

    return response;
  } catch (error: any) {
    return (
      error?.response?.data?.error?.message ||
      "Error sending confirmation email"
    );
  }
};

export const signInRequest = async (credentials: Credentials) => {
  try {
    const response = await axios.post(`${STRAPI_ENDPOINT}/api/auth/local`, {
      identifier: credentials.identifier,
      password: credentials.password,
    });

    return response;
  } catch (error: any) {
    return error?.response?.data?.error?.message || "Error signing in";
  }
};

export const forgotPasswordRequest = async (email: string) => {
  try {
    const response = await axios.post(
      `${STRAPI_ENDPOINT}/api/auth/forgot-password`,
      {
        email, // user's email
      }
    );

    return response;
  } catch (error: any) {
    return (
      error?.response?.data?.error?.message ||
      "Error sending reset password email"
    );
  }
};

export const resetPasswordRequest = async (credentials: Credentials) => {
  try {
    const response = await axios.post(
      `${STRAPI_ENDPOINT}/api/auth/reset-password`,
      {
        code: credentials?.code,
        password: credentials?.password,
        passwordConfirmation: credentials?.confirmPassword,
      }
    );

    return response;
  } catch (error: any) {
    return error?.response?.data?.error?.message || "Error resetting password";
  }
};

// Path: nextjs-frontend/src/app/lib/requests.ts

// ... other codes

export const changePasswordRequest = async (credentials: Credentials) => {
  try {
    const {
      session: { jwt },
    }: any = await verifySession();

    const response = await axios.post(
      `${STRAPI_ENDPOINT}/api/auth/change-password`,
      {
        currentPassword: credentials.password,
        password: credentials.newPassword,
        passwordConfirmation: credentials.confirmPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return response;
  } catch (error: any) {
    return error?.response?.data?.error?.message || "Error resetting password";
  }
};
