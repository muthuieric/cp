// components/ImageUploader.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";

type Props = {
  onComplete: (urls: string[]) => void;
};

export default function ImageUploader({ onComplete }: Props) {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState<string[]>([]);

  async function getAuth() {
    const res = await fetch("/api/upload-auth");
    if (!res.ok) throw new Error("Failed to get upload auth");
    return res.json(); // { token, expire, signature, publicKey }
  }

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);

    let auth;
    try {
      auth = await getAuth();
    } catch (err) {
      console.error(err);
      setUploading(false);
      return;
    }

    const urls: string[] = [];

    for (const file of Array.from(files)) {
      try {
        const form = new FormData();
        form.append("file", file); // File object
        form.append("fileName", file.name);
        // required auth params for ImageKit browser upload
        form.append("publicKey", auth.publicKey);
        form.append("token", auth.token);
        form.append("expire", String(auth.expire)); // seconds
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
          console.error("ImageKit upload error:", data);
        }
      } catch (err) {
        console.error("Upload error for file", file.name, err);
      }
    }

    setUploading(false);
    onComplete(urls);
  }

  return (
    <div>
      <input type="file" multiple accept="image/*" onChange={handleFiles} />
      {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
      <div className="grid grid-cols-3 gap-2 mt-3">
        {uploaded.map((u) => (
          <div key={u} className="relative w-full h-28 bg-gray-100 rounded overflow-hidden">
            {/* Use simple img preview here for speed; next/image requires width/height or container technique */}
            <Image src={u} alt="uploaded" className="w-full h-full object-cover"  />
          </div>
        ))}
      </div>
    </div>
  );
}
