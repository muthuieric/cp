"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { UploadCloud, CheckCircle2, Loader2 } from "lucide-react";

type UploaderProps = {
  onSuccess?: (url: string) => void;
  maxSizeMB?: number;
};

export default function Uploader({ onSuccess, maxSizeMB = 50 }: UploaderProps) {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function optimizeImage(file: File): Promise<File> {
    if (typeof window === "undefined") return file;
    if (!file.type.startsWith("image/") || file.type.includes("svg") || file.type.includes("gif")) {
      return file;
    }
    if (file.size <= 1.5 * 1024 * 1024) return file;

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          try {
            const maxDim = 2560;
            let { width, height } = img;
            if (width > maxDim || height > maxDim) {
              if (width > height) {
                height = Math.round((height * maxDim) / width);
                width = maxDim;
              } else {
                width = Math.round((width * maxDim) / height);
                height = maxDim;
              }
            }
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            if (!ctx) return resolve(file);
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob(
              (blob) => {
                if (blob && blob.size < file.size) {
                  const cleanName = file.name.replace(/\.[^/.]+$/, "") + ".jpg";
                  resolve(new File([blob], cleanName, { type: "image/jpeg" }));
                } else {
                  resolve(file);
                }
              },
              "image/jpeg",
              0.88
            );
          } catch {
            resolve(file);
          }
        };
        img.onerror = () => resolve(file);
        img.src = e.target?.result as string;
      };
      reader.onerror = () => resolve(file);
      reader.readAsDataURL(file);
    });
  }

  const handleUpload = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput?.files?.length) {
      toast.error("Please select a file to upload");
      return;
    }
    const file = fileInput.files[0];
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`File size exceeds maximum allowed ${maxSizeMB}MB`);
      return;
    }

    setUploading(true);
    setProgress(20);

    try {
      setProgress(20);
      let finalUrl: string | null = null;

      // 1. Direct Presigned URL upload to Cloudflare R2 (Bypasses Vercel 4.5MB completely)
      try {
        const presignRes = await fetch("/api/upload-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: file.name, contentType: file.type || "image/jpeg" }),
        });

        if (presignRes.ok) {
          const { uploadUrl, publicUrl } = await presignRes.json();
          if (uploadUrl && publicUrl) {
            const r2PutRes = await fetch(uploadUrl, {
              method: "PUT",
              body: file,
              headers: { "Content-Type": file.type || "image/jpeg" },
            });
            if (r2PutRes.ok) {
              finalUrl = publicUrl;
            }
          }
        }
      } catch (e) {
        console.warn("Direct upload fallback to proxy:", e);
      }

      // 2. Fallback to client-side optimized proxy upload
      if (!finalUrl) {
        setProgress(40);
        const fileToUpload = await optimizeImage(file);
        setProgress(60);

        const formData = new FormData();
        formData.append("file", fileToUpload);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          let msg = "Upload failed";
          try {
            const json = await res.json();
            if (json.error) msg = json.error;
          } catch {
            msg = `${res.status} ${res.statusText}`;
          }
          throw new Error(msg);
        }

        const data = await res.json();
        finalUrl = data.url || data.urls?.[0];
      }

      if (finalUrl) {
        setProgress(100);
        setUploadedUrl(finalUrl);
        toast.success("Photo uploaded successfully");
        if (onSuccess) onSuccess(finalUrl);
      } else {
        throw new Error("No URL returned from upload server");
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      toast.error(err.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border border-slate-200 rounded-xl bg-slate-50/50">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
          Upload Image (up to {maxSizeMB}MB)
        </label>
        <div className="flex items-center gap-3">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#0F172A] file:text-white hover:file:bg-slate-800 cursor-pointer"
          />
          <button
            type="button"
            onClick={handleUpload}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0F766E] hover:bg-[#0D9488] disabled:opacity-50 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
          >
            {uploading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Uploading ({progress}%)...</span>
              </>
            ) : (
              <>
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Upload</span>
              </>
            )}
          </button>
        </div>
      </div>

      {uploadedUrl && (
        <div className="flex items-center gap-2 p-2.5 bg-teal-50 border border-teal-200 rounded-lg text-xs text-teal-800">
          <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0" />
          <span className="truncate">
            Uploaded:{" "}
            <a href={uploadedUrl} target="_blank" rel="noreferrer" className="underline font-medium">
              {uploadedUrl}
            </a>
          </span>
        </div>
      )}
    </div>
  );
}
