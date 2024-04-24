import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface ISesson {
  id?: number;
}

export async function getSession() {
  return getIronSession<ISesson>(cookies(), {
    cookieName: "delicious-karrot",
    password: process.env.COOKIE_PASSWORD!,
  });
}

export async function login(id: number) {
  const session = await getSession();
  session.id = id;
  await session.save();
}
