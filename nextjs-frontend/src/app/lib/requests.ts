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
