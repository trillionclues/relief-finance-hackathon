import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { NextURL } from "next/dist/server/web/next-url";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname, origin } = request.nextUrl;

  const isTokenValid = token ? decodeToken(token) : false;

  if (!isTokenValid) {
    if (pathname !== "/login" && pathname !== "/") {
      const loginUrl = new NextURL("/login", origin);
      return NextResponse.redirect(loginUrl);
    }
  } else {
    if (pathname === "/login") {
      const dashboardUrl = new NextURL("/dashboard", origin);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // "/",
    "/dashboard/:path*",
    "/profile/:path*",
    "/login",
    // "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

// decode token and get expiration time
function decodeToken(token: string): boolean {
  try {
    const decodedToken = jwt.decode(token) as jwt.JwtPayload;

    if (!decodedToken || !decodedToken.exp) {
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp > currentTime;
  } catch (err) {
    console.error("Token decoding error:", err);
    return false;
  }
}
