import "server-only";

import { cookies } from "next/headers";

import { redirect } from "next/navigation";
import { decrypt } from "./session";

import { cache } from "react";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;

  const session = await decrypt(cookie);

  if (!session) {
    return { isAuth: false, session };
  }

  if (!session?.jwt) {
    redirect("/auth/login");
  }

  return { isAuth: true, session };
});
