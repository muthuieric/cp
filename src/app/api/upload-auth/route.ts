import { NextResponse } from "next/server";
import { isR2Configured } from "@/lib/r2";

export async function GET() {
  return NextResponse.json({
    storage: "cloudflare-r2",
    configured: isR2Configured,
    bucket: process.env.R2_BUCKET_NAME || "vms-photos",
    publicUrl: process.env.R2_PUBLIC_URL || "https://pub-cdeae69d6505439abecf6e0edbd7cf72.r2.dev",
  });
}
