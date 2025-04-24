import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { SessionPayload } from "@/app/lib/definitions";

// Retrieve the session secret from environment variables and encode it
const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

// Encrypts and signs the session payload as a JWT with a 7-day expiration
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

// Verifies and decodes the JWT session token
export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log(error);
  }
}

// Creates a new session by encrypting the payload and storing it in a secure cookie
export async function createSession(payload: SessionPayload) {
  // Set cookie to expire in 7 days
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  // Encrypt the session payload
  const session = await encrypt(payload);
  // Set the session cookie with the encrypted payload
  const cookieStore = await cookies();

  // Set the cookie with the session token
  cookieStore.set("session", session, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: false,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

// Deletes the session cookie to log out the user
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
