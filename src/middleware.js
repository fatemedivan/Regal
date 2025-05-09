import { NextResponse } from "next/server";

// AI
export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  const protectedPaths = ["/user", "/complete-data", "/payment"];

  const pathname = request.nextUrl.pathname;

  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (!token && isProtectedPath) {
    const signUpUrl = new URL("/auth/sign-up", request.url);
    return NextResponse.redirect(signUpUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/complete-data", "/payment"],
};
