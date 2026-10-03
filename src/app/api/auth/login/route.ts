import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma, { isDatabaseConfigured } from "@/lib/prisma";
import { signAdminToken, ADMIN_COOKIE_NAME } from "@/lib/jwt";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    let authenticatedUser: {
      id: string;
      email: string;
      name: string;
      role: string;
    } | null = null;

    // 1. Validate against Prisma database if configured
    if (isDatabaseConfigured) {
      try {
        const user = await prisma.user.findUnique({
          where: { email: normalizedEmail },
        });

        if (user) {
          const isValid = await bcrypt.compare(password, user.password);
          if (isValid) {
            authenticatedUser = {
              id: user.id,
              email: user.email,
              name: user.name || "Portfolio Administrator",
              role: user.role || "ADMIN",
            };
          }
        }
      } catch (dbErr) {
        console.warn("Prisma login query error, checking fallback:", dbErr);
      }
    }

    // 2. Validate fallback bootstrap admin credentials
    if (!authenticatedUser) {
      if (
        (normalizedEmail === "admin@karanholdings.com" || normalizedEmail === "admin@pmcommercial.com") &&
        (password === "admin" || password === "Admin123!")
      ) {
        authenticatedUser = {
          id: "pm-admin-01",
          email: normalizedEmail,
          name: "Portfolio Administrator",
          role: "ADMIN",
        };
      }
    }

    if (!authenticatedUser) {
      return NextResponse.json(
        { error: "Invalid credentials. Please verify your email and password." },
        { status: 401 }
      );
    }

    // 3. Generate Edge-compatible JWT token using jose
    const token = await signAdminToken({
      id: authenticatedUser.id,
      email: authenticatedUser.email,
      name: authenticatedUser.name,
      role: authenticatedUser.role,
    });

    // 4. Return response with HttpOnly, Secure, SameSite=Strict cookie
    const response = NextResponse.json({
      success: true,
      user: authenticatedUser,
      message: "Authentication successful.",
    });

    const isProduction = process.env.NODE_ENV === "production";

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    });

    return response;
  } catch (error: any) {
    console.error("Login API route error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during authentication." },
      { status: 500 }
    );
  }
}
