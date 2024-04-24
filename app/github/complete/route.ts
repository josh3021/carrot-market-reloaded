import {
  createUser,
  findUser,
  getAccessToken,
  getGithubProfile,
  isUsernameExists,
} from "@/lib/github/auth";
import { login } from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) return notFound();

  const { error, accessToken } = await getAccessToken(code);
  if (error) {
    return NextResponse.json({ error: "400 Bad Request" }, { status: 400 });
  }

  const { id, avatar_url, username, emailDatas } = await getGithubProfile(
    accessToken
  );

  const user = await findUser(id);

  if (user) {
    await login(user.id);
    return redirect("/profile");
  }

  // if user does not exist
  const exists = await isUsernameExists(username);

  const newUser = await createUser(exists, {
    email: emailDatas.find(
      (emailData) => emailData.primary && emailData.verified
    )?.email,
    github_id: String(id),
    avatar: avatar_url,
    username,
  });
  await login(newUser.id);
  return redirect("/profile");
}
