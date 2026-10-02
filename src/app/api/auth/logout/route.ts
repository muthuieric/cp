import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/jwt";

export const dynamic = "force-dynamic";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully.",
  });

  const isProduction = process.env.NODE_ENV === "production";

  // Expire and clear the admin JWT cookie
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });

  return response;
}

export async function GET() {
  return POST();
}
