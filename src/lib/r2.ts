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

import crypto from "crypto";

function hmac(key: string | Buffer, str: string): Buffer {
  return crypto.createHmac("sha256", key).update(str, "utf8").digest();
}

function hash(str: string): string {
  return crypto.createHash("sha256").update(str, "utf8").digest("hex");
}

export function getR2PresignedPutUrl(
  fileName: string,
  contentType: string = "image/jpeg",
  expiresIn: number = 3600
): { uploadUrl: string; publicUrl: string; key: string } {
  if (!isR2Configured) {
    throw new Error("Cloudflare R2 is not fully configured in environment variables");
  }

  const sanitizedName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
  const uniqueKey = `properties/${Date.now()}-${sanitizedName}`;

  const host = `${accountId}.r2.cloudflarestorage.com`;
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
  const dateStamp = amzDate.slice(0, 8);
  const region = "auto";
  const service = "s3";

  const credential = `${accessKeyId}/${dateStamp}/${region}/${service}/aws4_request`;

  const queryParams: Record<string, string> = {
    "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
    "X-Amz-Credential": credential,
    "X-Amz-Date": amzDate,
    "X-Amz-Expires": String(expiresIn),
    "X-Amz-SignedHeaders": "host",
  };

  const canonicalQueryString = Object.keys(queryParams)
    .sort()
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(queryParams[k])}`)
    .join("&");

  const canonicalUri = `/${bucketName}/${uniqueKey}`;
  const canonicalHeaders = `host:${host}\n`;
  const signedHeaders = "host";
  const payloadHash = "UNSIGNED-PAYLOAD";

  const canonicalRequest = [
    "PUT",
    canonicalUri,
    canonicalQueryString,
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join("\n");

  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    `${dateStamp}/${region}/${service}/aws4_request`,
    hash(canonicalRequest),
  ].join("\n");

  const kDate = hmac(`AWS4${secretAccessKey}`, dateStamp);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, service);
  const kSigning = hmac(kService, "aws4_request");
  const signature = crypto.createHmac("sha256", kSigning).update(stringToSign, "utf8").digest("hex");

  const uploadUrl = `https://${host}${canonicalUri}?${canonicalQueryString}&X-Amz-Signature=${signature}`;

  const cleanPublicUrl = publicUrl.endsWith("/")
    ? publicUrl.slice(0, -1)
    : publicUrl;
  const finalPublicUrl = `${cleanPublicUrl}/${uniqueKey}`;

  return {
    uploadUrl,
    publicUrl: finalPublicUrl,
    key: uniqueKey,
  };
}
