import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;
  const protectedPaths = ["/user", "/complete-data", "/payment"];
  const authPaths = ["/auth/login", "/auth/sign-up"];
  const adminPath = ["/admin"];
  const pathname = request.nextUrl.pathname;

  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );
  const isAuthPath = authPaths.includes(pathname);

  const isAdminPath = adminPath.some((path) => pathname.startsWith(path));

  if (!token && isProtectedPath) {
    const signUpUrl = new URL("/auth/sign-up", request.url);
    return NextResponse.redirect(signUpUrl);
  }

  if (token && isAuthPath) {
    const userUrl = new URL("/user/profile", request.url);
    return NextResponse.redirect(userUrl);
  }

  if (role?.toLowerCase() === "user" && isAdminPath) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  if (!token && isAdminPath) {
    const signUpUrl = new URL("/auth/sign-up", request.url);
    return NextResponse.redirect(signUpUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/user/:path*",
    "/complete-data",
    "/payment",
    "/auth/login",
    "/auth/sign-up",
  ],
};
