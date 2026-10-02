import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma, { isDatabaseConfigured } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Invalid property ID" }, { status: 400 });
  }

  if (!isDatabaseConfigured) {
    return NextResponse.json({
      success: true,
      message: "Database not connected. Mock delete successful.",
    });
  }

  try {
    await prisma.property.delete({ where: { id: String(id) } });
    revalidatePath("/properties");
    revalidatePath("/admin-view");
    return NextResponse.json({ success: true, message: "Property deleted successfully" });
  } catch (error) {
    console.error("Failed to delete property:", error);
    return NextResponse.json(
      { error: "Failed to delete property" },
      { status: 500 }
    );
  }
}

