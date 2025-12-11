import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;

  const protectedPaths = ["/user", "/complete-data", "/payment"];
  const authPaths = ["/auth/login", "/auth/register"];

  const isAuthPaths = authPaths.includes(pathName);
  const isProtectedPaths = protectedPaths.some((p) => pathName.startsWith(p));

  if (!token && isProtectedPaths) {
    const signUpUrl = new URL("/auth/register", request.url);
    return NextResponse.redirect(signUpUrl);
  }
  if (token && isAuthPaths) {
    const userUrl = new URL("/user/profile", request.url);
    return NextResponse.redirect(userUrl);
  }


  return NextResponse.next();
}

export const config = {
  matcher: [
    "/user/:path*",
    "/complete-data",
    "/payment",
    "/auth/login",
    "/auth/register",
  ],
};
