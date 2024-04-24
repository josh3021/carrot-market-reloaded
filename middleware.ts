import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

interface IRoutes {
  [key: string]: boolean;
}

const publicOnlyUrls: IRoutes = {
  "/": true,
  "/login": true,
  "/sms": true,
  "/create-account": true,
  "/github/start": true,
  "/github/complete": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];
  // 로그인 상태가 아니면
  if (!session.id) {
    if (!exists) {
      NextResponse.redirect(new URL("/login", request.url));
    }
    //로그인 상태이면
  } else {
    if (exists) {
      NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/iamge|favicon.ico).*)"],
};
