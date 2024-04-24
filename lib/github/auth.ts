import db from "../db";

const accessTokenUrl = process.env.GITHUB_OAUTH2_ACCESS_TOKEN_URL!;

interface IGithubResponse {
  login: string;
  id: number;
  avatar_url: string;
}

interface IGithubEmailResponse {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string;
}

export async function getAccessToken(code: string) {
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  };
  const formattedParams = new URLSearchParams(params).toString();
  const finalUrl = `${accessTokenUrl}?${formattedParams}`;
  const accessTokenResponse = await fetch(finalUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });
  const { error, access_token: accessToken } = await accessTokenResponse.json();
  return {
    error,
    accessToken,
  };
}

export async function getGithubProfile(accessToken: string) {
  const [{ id, avatar_url, login: username }, emailDatas] = await Promise.all([
    fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-cache",
    }).then<IGithubResponse>((response) => response.json()),
    fetch("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then<IGithubEmailResponse[]>((response) => response.json()),
  ]);
  return { id, avatar_url, username, emailDatas };
}

export async function findUser(id: number) {
  return db.user.findUnique({
    where: {
      github_id: String(id),
    },
    select: {
      id: true,
    },
  });
}

export async function isUsernameExists(username: string) {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
}

export async function createUser(
  isExists: boolean,
  data: {
    email?: string;
    github_id: string;
    avatar: string;
    username: string;
  }
) {
  if (isExists) {
    return db.user.create({
      data: {
        ...data,
        username: `${data.username}-gh-${Math.random()
          .toString(36)
          .substring(2, 12)}`,
      },
    });
  }
  return db.user.create({
    data,
  });
}
