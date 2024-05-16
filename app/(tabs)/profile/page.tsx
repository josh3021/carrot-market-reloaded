import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

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

async function Username() {
  const user = await getUser();
  return <h1>Welcome! {user?.username}</h1>;
}

export default async function Profile() {
  async function logout() {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/");
  }

  return (
    <div>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Username />
      </Suspense>
      <form action={logout}>
        <button>Logout</button>
      </form>
    </div>
  );
}
