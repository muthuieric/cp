import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import bcrypt from "bcryptjs";
import prisma, { isDatabaseConfigured } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized access. Institutional admin credentials required." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { currentPassword, newPassword, confirmPassword } = body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { error: "All password fields are required." },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "New password and confirmation do not match." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const email = session.user.email?.trim().toLowerCase() || "admin@pmcommercial.com";

    if (!isDatabaseConfigured) {
      return NextResponse.json(
        { error: "Database connection is not configured." },
        { status: 503 }
      );
    }

    // Lookup user in Prisma
    let existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      const isMatch = await bcrypt.compare(currentPassword, existingUser.password);
      if (!isMatch) {
        return NextResponse.json(
          { error: "The current password provided is incorrect." },
          { status: 400 }
        );
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: { email },
        data: {
          password: hashedNewPassword,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Institutional admin credentials updated successfully.",
      });
    } else {
      // User is logging in with default fallback credentials
      if (currentPassword !== "admin" && currentPassword !== "Admin123!") {
        return NextResponse.json(
          { error: "The current password provided is incorrect." },
          { status: 400 }
        );
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await prisma.user.create({
        data: {
          email,
          name: session.user.name || "Portfolio Administrator",
          password: hashedNewPassword,
          role: "ADMIN",
        },
      });

      return NextResponse.json({
        success: true,
        message: "Institutional admin record created and credentials updated successfully.",
      });
    }
  } catch (error: any) {
    console.error("Error changing password:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred while updating password." },
      { status: 500 }
    );
  }
}
