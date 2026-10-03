"use client";

import { useRef, useState } from "react";

export default function Uploader() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput?.files?.length) {
      alert("Please select a file to upload");
      return;
    }
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    setProgress(50);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setProgress(100);
      if (res.ok && data.url) {
        setUploadedUrl(data.url);
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input type="file" ref={fileInputRef} accept="image/*" />
      <button
        type="button"
        onClick={handleUpload}
        disabled={uploading}
        className="px-4 py-2 bg-primary text-white rounded"
      >
        {uploading ? `Uploading (${progress}%)...` : "Upload"}
      </button>
      {uploadedUrl && (
        <p className="text-sm text-green-600">
          Uploaded: <a href={uploadedUrl} target="_blank" rel="noreferrer" className="underline">{uploadedUrl}</a>
        </p>
      )}
    </div>
  );
}
