import { NextResponse } from "next/server";
import { getR2PresignedPutUrl, isR2Configured } from "@/lib/r2";

export const dynamic = "force-dynamic";
export const maxDuration = 60;
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    if (!isR2Configured) {
      return NextResponse.json(
        { error: "Cloudflare R2 is not configured in environment variables" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { filename, contentType } = body;

    if (!filename) {
      return NextResponse.json(
        { error: "filename is required" },
        { status: 400 }
      );
    }

    const { uploadUrl, publicUrl, key } = getR2PresignedPutUrl(
      filename,
      contentType || "image/jpeg",
      3600
    );

    return NextResponse.json({
      success: true,
      uploadUrl,
      publicUrl,
      key,
    });
  } catch (error: any) {
    console.error("Presigned URL error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to generate upload URL" },
      { status: 500 }
    );
  }
}
