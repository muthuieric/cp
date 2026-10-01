import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_BUCKET_NAME || "vms-photos";
const publicUrl = process.env.R2_PUBLIC_URL || "https://pub-cdeae69d6505439abecf6e0edbd7cf72.r2.dev";

export const isR2Configured = Boolean(
  accountId && accessKeyId && secretAccessKey
);

export const r2Client = new S3Client({
  region: "auto",
  endpoint: accountId ? `https://${accountId}.r2.cloudflarestorage.com` : undefined,
  credentials: {
    accessKeyId: accessKeyId || "",
    secretAccessKey: secretAccessKey || "",
  },
});

export async function uploadToR2(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  const sanitizedName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
  const uniqueKey = `properties/${Date.now()}-${sanitizedName}`;

  if (!isR2Configured) {
    throw new Error("Cloudflare R2 is not fully configured in environment variables");
  }

  await r2Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: uniqueKey,
      Body: fileBuffer,
      ContentType: contentType,
    })
  );

  const cleanPublicUrl = publicUrl.endsWith("/")
    ? publicUrl.slice(0, -1)
    : publicUrl;
  return `${cleanPublicUrl}/${uniqueKey}`;
}
