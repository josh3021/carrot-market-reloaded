import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export interface ISession {
  id?: number;
}

export async function getSession() {
  return getIronSession<ISession>(cookies(), {
    cookieName: "delicious-karrot",
    password: process.env.COOKIE_PASSWORD!,
  });
}

export async function login(id: number) {
  const session = await getSession();
  session.id = id;
  await session.save();
}
