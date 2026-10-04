import { NextResponse } from "next/server";
import { uploadToR2, isR2Configured } from "@/lib/r2";

export const dynamic = "force-dynamic";
export const maxDuration = 60;
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const singleFile = formData.get("file") as File | null;

    const filesToUpload: File[] = [];
    if (files && files.length > 0) {
      filesToUpload.push(...files);
    } else if (singleFile) {
      filesToUpload.push(singleFile);
    }

    if (filesToUpload.length === 0) {
      return NextResponse.json(
        { error: "No files provided for upload" },
        { status: 400 }
      );
    }

    const uploadedUrls: string[] = [];

    for (let i = 0; i < filesToUpload.length; i++) {
      const file = filesToUpload[i];
      if (!isR2Configured) {
        return NextResponse.json(
          { error: "Cloudflare R2 is not configured in environment variables" },
          { status: 500 }
        );
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const url = await uploadToR2(buffer, file.name, file.type || "image/jpeg");
      uploadedUrls.push(url);
    }

    return NextResponse.json({
      success: true,
      urls: uploadedUrls,
      url: uploadedUrls[0] || null,
    });
  } catch (error: any) {
    console.error("Upload route error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process upload" },
      { status: 500 }
    );
  }
}
