// components/ImageUploader.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";

type Props = {
  onComplete: (urls: string[]) => void;
  maxSize?: number; // Practically infinite default (500MB) to allow unrestricted uploads
};

export default function ImageUploader({ onComplete, maxSize = 500 * 1024 * 1024 }: Props) {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  async function getAuth() {
    const res = await fetch("/api/upload-auth");
    if (!res.ok) throw new Error("Failed to get upload auth");
    return res.json();
  }

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadProgress(0);

    let auth;
    try {
      auth = await getAuth();
    } catch (err) {
      console.error(err);
      setUploading(false);
      return;
    }

    const urls: string[] = [];
    const fileArray = Array.from(files);

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      // Unrestricted uploads: only check against the 500MB ceiling if explicit
      if (maxSize && file.size > maxSize) {
        console.warn(`File ${file.name} exceeds 500MB ceiling.`);
        continue;
      }

      try {
        const form = new FormData();
        form.append("file", file);
        form.append("fileName", file.name);

        // Supports Cloudflare R2 / ImageKit backend
        if (auth.storage === "cloudflare-r2" || !auth.publicKey) {
          const uploadRes = await fetch("/api/upload", {
            method: "POST",
            body: form,
          });
          const data = await uploadRes.json();
          const uploadedUrl = data.url || data.urls?.[0];
          if (uploadRes.ok && uploadedUrl) {
            urls.push(uploadedUrl);
            setUploaded((s) => [...s, uploadedUrl]);
          }
        } else {
          form.append("publicKey", auth.publicKey);
          form.append("token", auth.token);
          form.append("expire", String(auth.expire));
          form.append("signature", auth.signature);

          const uploadRes = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
            method: "POST",
            body: form,
          });

          const data = await uploadRes.json();
          if (uploadRes.ok && data.url) {
            urls.push(data.url);
            setUploaded((s) => [...s, data.url]);
          } else {
            console.error("Upload error:", data);
          }
        }
      } catch (err) {
        console.error("Upload error for file", file.name, err);
      } finally {
        setUploadProgress(Math.round(((i + 1) / fileArray.length) * 100));
      }
    }

    setUploading(false);
    onComplete(urls);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-slate-700">Property Photography</label>
        <input 
          type="file" 
          multiple 
          accept="image/jpeg,image/png,image/webp,image/*" 
          onChange={handleFiles} 
          className="block w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#0F172A] file:text-white hover:file:bg-slate-800 cursor-pointer"
        />
        <p className="text-[11px] text-slate-500">
          Select high-quality photography files (JPG, PNG, WebP)
        </p>
      </div>

      {uploading && (
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-[#0F766E] h-2 transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}

      {uploaded.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-2">
          {uploaded.map((u, idx) => (
            <div key={`${u}-${idx}`} className="relative w-full h-24 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 shadow-sm">
              <Image src={u} alt="uploaded photography" fill sizes="150px" className="object-cover" quality={100} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
