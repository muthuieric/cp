import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminToken, ADMIN_COOKIE_NAME } from "@/lib/jwt";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Check for jose Edge-compatible JWT cookie (admin_token)
  const adminCookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  let isAuthenticated = false;

  if (adminCookie) {
    const verified = await verifyAdminToken(adminCookie);
    if (verified) {
      isAuthenticated = true;
    }
  }

  // 2. Fallback check for NextAuth session token
  if (!isAuthenticated) {
    try {
      const nextAuthToken = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET || "pm_commercial_secure_jwt_token_secret_key_2025_edge",
      });
      if (nextAuthToken) {
        isAuthenticated = true;
      }
    } catch {
      // ignore
    }
  }

  // 3. If unauthenticated, redirect or return 401
  if (!isAuthenticated) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Unauthorized access. Authentication token required." },
        { status: 401 }
      );
    }

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/admin-view",
    "/admin-view/:path*",
  ],
};
