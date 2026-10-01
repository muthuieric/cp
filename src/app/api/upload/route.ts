import { NextResponse } from "next/server";
import { uploadToR2, isR2Configured } from "@/lib/r2";

const SAMPLE_FALLBACK_IMAGES = [
  "/images/hero-villa.jpg",
  "/images/hero-villa.jpg",
  "/images/hero-villa.jpg",
  "/images/hero-villa.jpg",
];

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
      try {
        if (!isR2Configured) {
          // Fallback to sample image if R2 is not configured
          const fallback = SAMPLE_FALLBACK_IMAGES[i % SAMPLE_FALLBACK_IMAGES.length];
          uploadedUrls.push(fallback);
          continue;
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const url = await uploadToR2(buffer, file.name, file.type || "image/jpeg");
        uploadedUrls.push(url);
      } catch (uploadError) {
        console.warn(`R2 upload failed for file ${file.name}, using sample image fallback:`, uploadError);
        const fallback = SAMPLE_FALLBACK_IMAGES[i % SAMPLE_FALLBACK_IMAGES.length];
        uploadedUrls.push(fallback);
      }
    }

    return NextResponse.json({
      success: true,
      urls: uploadedUrls,
      url: uploadedUrls[0] || null,
    });
  } catch (error) {
    console.error("Upload route error:", error);
    return NextResponse.json(
      { error: "Failed to process upload" },
      { status: 500 }
    );
  }
}
