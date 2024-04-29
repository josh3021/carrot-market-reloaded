import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (!session.id) notFound();
  const id = session.id;
  return db.user.findUnique({
    where: {
      id,
    },
  });
}

export default async function Profile() {
  const user = await getUser();
  async function logout() {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/");
  }

  return (
    <div>
      <h1>Welcome! {user?.username}</h1>
      <form action={logout}>
        <button>Logout</button>
      </form>
    </div>
  );
}
