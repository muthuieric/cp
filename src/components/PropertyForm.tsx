"use client";

import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import dynamic from "next/dynamic";
import { X, MapPin, Info, LayoutList, Image as ImageIcon, Sparkles, UploadCloud, Plus, Loader2, Check } from "lucide-react";
import { stripHtml } from "@/lib/commercialAssets";
import 'react-quill-new/dist/quill.snow.css';

// Rich Text Editor loaded dynamically on client
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const quillModules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['clean']
  ],
};

const COMMERCIAL_ASSET_CLASSES = [
  "Office",
  "Retail",
  "Logistics",
  "Hospitality",
  "Commercial Land",
  "Mixed-Use"
];

const COMMERCIAL_STATUSES = [
  "Available",
  "Occupied"
];

const COMMERCIAL_AMENITIES = [
  "3-Phase Power",
  "Backup Generator (100% Redundancy)",
  "Fiber Optic Backbone",
  "Helipad Facility",
  "CCTV & Access Control",
  "24/7 Armed Security",
  "Automatic Fire Suppression",
  "High-Speed Passenger Elevators",
  "Heavy Vehicle Loading Docks",
  "Cold Storage Infrastructure",
  "Multi-Level Basement Parking",
  "Rooftop Terrace / Event Pavilion",
  "Executive Boardroom Suites",
  "Staff Wellness & Fitness Suite",
  "Cafeteria / Dining Hall",
  "Smart Building Management System (BMS)"
];

const POPULAR_LOCATIONS = [
  "Westlands",
  "Kilimani",
  "Lavington",
  "Upperhill",
  "Riverside",
  "Parklands",
  "Gigiri",
  "CBD",
  "Mombasa Road",
  "Karen",
  "Kileleshwa",
  "Spring Valley",
  "Hurlingham",
  "General Mathenge",
  "Brookside",
  "Rhapta Road",
  "Kiambu Road",
  "Ruaraka",
  "South C",
  "South B",
];

/**
 * Client-side optimization: converts large images (up to 50MB) down to high-definition web standard (2560px, JPEG 0.88),
 * drastically cutting transfer sizes to ~1MB.
 */
async function optimizeImageForUpload(file: File): Promise<File> {
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
                resolve(new File([blob], cleanName, { type: "image/jpeg", lastModified: Date.now() }));
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

/**
 * Uploads a file of ANY size (up to 50MB+) by first attempting direct presigned URL upload to Cloudflare R2
 * (completely bypassing Vercel's 4.5MB serverless limit), with automated seamless fallback to optimized proxy upload.
 */
async function uploadFileWithBypass(file: File): Promise<string> {
  // Strategy 1: Direct-to-R2 Presigned PUT (Bypasses Vercel 4.5MB completely)
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
          headers: {
            "Content-Type": file.type || "image/jpeg",
          },
        });

        if (r2PutRes.ok) {
          return publicUrl;
        }
        console.warn("Direct R2 PUT status:", r2PutRes.status, "trying optimized proxy fallback...");
      }
    }
  } catch (directErr) {
    console.warn("Direct R2 upload bypassed to proxy fallback:", directErr);
  }

  // Strategy 2: Client-side compressed proxy upload (bypasses 4.5MB by shrinking 50MB down to ~1MB)
  const preparedFile = await optimizeImageForUpload(file);
  const formData = new FormData();
  formData.append("file", preparedFile);

  const proxyRes = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!proxyRes.ok) {
    let msg = "Upload failed";
    try {
      const errJson = await proxyRes.json();
      if (errJson.error) msg = errJson.error;
    } catch {
      msg = `${proxyRes.status} ${proxyRes.statusText}`;
    }
    throw new Error(`Upload error (${file.name}): ${msg}`);
  }

  const proxyData = await proxyRes.json();
  const finalUrl = proxyData.url || proxyData.urls?.[0];
  if (!finalUrl) {
    throw new Error(`Upload completed for ${file.name} but no public URL was returned.`);
  }

  return finalUrl;
}

type PropertyFormProps = {
  initialData?: any;
  onSuccess?: () => void;
};

export default function PropertyForm({ initialData, onSuccess }: PropertyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<{ show: boolean; message: string; total: number; current: number }>({
    show: false, message: "", total: 0, current: 0,
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [titleVal, setTitleVal] = useState(initialData?.title || "");
  const [priceVal, setPriceVal] = useState(initialData?.price ? String(initialData.price) : "");
  const [areaVal, setAreaVal] = useState(initialData?.area ? String(initialData.area) : "");

  // Form Fields
  const [description, setDescription] = useState(initialData?.description || "");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    Array.isArray(initialData?.amenities) ? initialData.amenities : []
  );
  const [customAmenity, setCustomAmenity] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>(initialData?.location || "");
  const [selectedType, setSelectedType] = useState<string>(initialData?.type || "Office");
  const [selectedStatus, setSelectedStatus] = useState<string>(
    initialData?.status
      ? (String(initialData.status).toLowerCase().includes("occup") || String(initialData.status).toLowerCase().includes("rent") ? "Occupied" : "Available")
      : "Available"
  );

  // Multi-Image Uploader State (up to 20 images)
  const [images, setImages] = useState<string[]>(
    initialData?.images && Array.isArray(initialData.images)
      ? initialData.images.map((img: any) => (typeof img === "string" ? img : img.url)).filter(Boolean).slice(0, 20)
      : []
  );
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [directImageUrl, setDirectImageUrl] = useState("");

  // Sync initialData
  useEffect(() => {
    if (initialData) {
      if (initialData.title !== undefined) setTitleVal(initialData.title || "");
      if (initialData.price !== undefined) setPriceVal(initialData.price ? String(initialData.price) : "");
      if (initialData.area !== undefined) setAreaVal(initialData.area ? String(initialData.area) : "");
      if (initialData.description !== undefined) setDescription(initialData.description || "");
      if (initialData.type) setSelectedType(initialData.type);
      if (initialData.location) setSelectedLocation(initialData.location);
      if (initialData.status) {
        const st = String(initialData.status).toLowerCase();
        setSelectedStatus(st.includes("occup") || st.includes("rent") ? "Occupied" : "Available");
      }
      if (Array.isArray(initialData.amenities)) {
        setSelectedAmenities(initialData.amenities);
      }
      if (initialData.images && Array.isArray(initialData.images)) {
        const urlList = initialData.images.map((img: any) =>
          typeof img === "string" ? img : img.url
        ).filter(Boolean);
        setImages(urlList.slice(0, 20));
      }
    }
  }, [initialData]);

  // Handle Multi-File Selection (up to 20 files, each up to 50MB)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const incomingFiles = Array.from(e.target.files);

    const oversized = incomingFiles.filter((f) => f.size > 50 * 1024 * 1024);
    if (oversized.length > 0) {
      toast.error(
        `File size limit is 50MB: ${oversized.map((f) => f.name).join(", ")} exceeded 50MB.`
      );
    }

    const validFiles = incomingFiles.filter((f) => f.size <= 50 * 1024 * 1024);
    if (validFiles.length === 0) return;

    const combinedFiles = [...selectedFiles, ...validFiles].slice(0, 20);
    setSelectedFiles(combinedFiles);

    // Create object URLs for instant multi-image previews
    const newPreviewUrls = validFiles.map((file) => URL.createObjectURL(file));
    const combinedImages = [...images, ...newPreviewUrls].slice(0, 20);
    setImages(combinedImages);
  };

  const removeImageAt = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const addDirectImage = () => {
    const trimmed = directImageUrl.trim();
    if (trimmed && images.length < 20) {
      setImages((prev) => [...prev, trimmed]);
      setDirectImageUrl("");
    }
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const addCustomAmenity = () => {
    const trimmed = stripHtml(customAmenity.trim());
    if (trimmed.length >= 2 && !selectedAmenities.includes(trimmed)) {
      setSelectedAmenities([...selectedAmenities, trimmed]);
      setCustomAmenity("");
    }
  };

  const getFormattedLocation = () => {
    return selectedLocation.trim() || "Nairobi Prime Corridor";
  };

  // Submit Handler with sequential per-file upload + live progress
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setUploadProgress(5);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      let finalImageList: string[] = images.filter((url) => !url.startsWith("blob:"));

      // Sequential upload: one file at a time with live progress & direct-to-R2 bypass
      if (selectedFiles.length > 0) {
        const total = selectedFiles.length;
        setUploadStatus({ show: true, message: `Preparing ${total} image${total > 1 ? "s" : ""}...`, total, current: 0 });
        setUploadProgress(10);

        for (let i = 0; i < selectedFiles.length; i++) {
          const file = selectedFiles[i];
          const pct = Math.round(10 + ((i) / total) * 75);
          setUploadProgress(pct);
          setUploadStatus({
            show: true,
            message: `Uploading image ${i + 1} of ${total} (${file.name})...`,
            total,
            current: i + 1,
          });

          const uploadedUrl = await uploadFileWithBypass(file);
          finalImageList.push(uploadedUrl);
        }

        setUploadProgress(90);
        setUploadStatus({ show: true, message: "Saving asset to database...", total, current: total });
      }

      if (finalImageList.length === 0) {
        if (selectedFiles.length > 0) {
          throw new Error("No images were successfully uploaded. Please try re-selecting your images.");
        }
        finalImageList = ["/images/hq-commercial-tower.jpg"];
      }

      setUploadProgress(92);

      const propertyData = {
        id: initialData?.id,
        title: titleVal.trim() || (formData.get("title") as string),
        location: getFormattedLocation(),
        price: Number(priceVal || formData.get("price")),
        type: selectedType,
        status: selectedStatus,
        bedrooms: 0,
        bathrooms: 0,
        area: areaVal ? Number(areaVal) : (formData.get("area") ? Number(formData.get("area")) : null),
        description: description,
        amenities: selectedAmenities,
        images: finalImageList,
        imageUrls: finalImageList,
      };

      const method = initialData ? "PUT" : "POST";
      const res = await fetch("/api/properties", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(propertyData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to persist commercial asset.");
      }

      setUploadProgress(100);
      toast.success(initialData ? "Commercial asset updated successfully!" : "Commercial asset registered successfully!");

      if (!initialData) {
        form.reset();
        setSelectedAmenities([]);
        setImages([]);
        setSelectedFiles([]);
        setDescription("");
      }

      router.refresh();
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.warn("Submission error:", err);
      toast.error(err.message || "Submission failed. Please check details and try again.");
    } finally {
      setLoading(false);
      setUploadProgress(0);
      setUploadStatus({ show: false, message: "", total: 0, current: 0 });
    }
  };

  return (
    <Card className={`rounded-xl border border-slate-200/90 shadow-sm bg-white ${initialData ? "border-none shadow-none" : "max-w-5xl mx-auto"}`}>
      <CardContent className={initialData ? "p-0" : "p-4 sm:p-6 md:p-8"}>
        <div className="mb-6 pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]" style={{ fontFamily: "Cinzel, Georgia, serif" }}>
              {initialData ? "Edit Property Details" : "Add New Commercial Property"}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 font-light">
              Enter property details, available floor space, monthly rent, and amenities.
            </p>
          </div>
          <span className="text-xs bg-[#0F766E]/10 text-[#0F766E] border border-[#0F766E]/20 px-3 py-1 rounded-full font-medium self-start sm:self-auto">
            Commercial Leasing
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* SECTION 1: PROPERTY DETAILS & PRICING */}
          <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200/80 space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider flex items-center gap-2 text-[#0F172A]">
              <span className="px-2 py-0.5 bg-[#0F766E] text-white text-[10px] font-bold rounded">Step 1 of 5</span>
              Property Pricing &amp; Details
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5 block">
                  Asset Title *
                </label>
                <Input
                  name="title"
                  placeholder="e.g. The Delta Pinnacle Grade A Office Tower"
                  value={titleVal}
                  onChange={(e) => setTitleVal(e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, title: true }))}
                  required
                  className={`bg-white rounded-lg text-sm text-[#0F172A] focus:ring-2 focus:ring-[#0F766E]/40 focus:border-[#0F766E] ${
                    touched.title && !titleVal.trim()
                      ? "border-rose-500 ring-1 ring-rose-500/30"
                      : "border-slate-200"
                  }`}
                />
                {touched.title && !titleVal.trim() && (
                  <p className="text-xs text-rose-600 mt-1 font-medium">
                    Property Title is required.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5 block">
                    Commercial Status *
                  </label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus} required>
                    <SelectTrigger className="bg-white border-slate-200 rounded-lg text-sm text-[#0F172A]">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {COMMERCIAL_STATUSES.map((st) => (
                        <SelectItem key={st} value={st}>
                          {st}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5 block">
                    Monthly Rent (Ksh) *
                  </label>
                  <Input
                    type="number"
                    name="price"
                    placeholder="e.g. 150000"
                    value={priceVal}
                    onChange={(e) => setPriceVal(e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, price: true }))}
                    required
                    className={`bg-white rounded-lg text-sm text-[#0F172A] focus:ring-2 focus:ring-[#0F766E]/40 focus:border-[#0F766E] ${
                      touched.price && !priceVal.trim()
                        ? "border-rose-500 ring-1 ring-rose-500/30"
                        : "border-slate-200"
                    }`}
                  />
                  {touched.price && !priceVal.trim() && (
                    <p className="text-xs text-rose-600 mt-1 font-medium">
                      Monthly rent is required.
                    </p>
                  )}
                  {Number(areaVal) > 0 && (
                    <div className="mt-2 flex items-center justify-between text-xs text-slate-600 bg-teal-50/70 border border-[#0F766E]/20 p-2 rounded-lg">
                      <span>Rate: Ksh 80/sq.ft = <strong>Ksh {(Number(areaVal) * 80).toLocaleString()}/mo</strong></span>
                      <button
                        type="button"
                        onClick={() => setPriceVal(String(Number(areaVal) * 80))}
                        className="text-[#0F766E] font-bold hover:underline cursor-pointer"
                      >
                        Apply Rate
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: PRIME CORRIDOR & LOCATION */}
          <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200/80 space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider flex items-center gap-2 text-[#0F172A]">
              <span className="px-2 py-0.5 bg-[#0F766E] text-white text-[10px] font-bold rounded">Step 2 of 5</span>
              Location &amp; Corridor
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5 block">
                  Commercial Corridor (Quick Select)
                </label>
                <Select
                  value={POPULAR_LOCATIONS.includes(selectedLocation) ? selectedLocation : ""}
                  onValueChange={(val) => setSelectedLocation(val)}
                >
                  <SelectTrigger className="bg-white border-slate-200 rounded-lg text-sm text-[#0F172A]">
                    <SelectValue placeholder="Choose Corridor (Optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {POPULAR_LOCATIONS.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5 block">
                  Location / Building Address *
                </label>
                <Input
                  name="location"
                  placeholder="e.g. Lavington or Riverside Drive, Westlands"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, location: true }))}
                  required
                  className={`bg-white rounded-lg text-sm text-[#0F172A] ${
                    touched.location && !selectedLocation.trim()
                      ? "border-rose-500 ring-1 ring-rose-500/30"
                      : "border-slate-200"
                  }`}
                />
                {touched.location && !selectedLocation.trim() && (
                  <p className="text-xs text-rose-600 mt-1 font-medium">
                    Location is required.
                  </p>
                )}
              </div>
            </div>

            {selectedLocation && (
              <div className="p-3 bg-white border border-slate-200 rounded-lg flex items-center gap-2 text-xs text-slate-600">
                <Info className="w-3.5 h-3.5 text-[#0F766E] shrink-0" />
                <span>
                  Selected location: <strong className="text-[#0F172A]">{selectedLocation}</strong>
                </span>
              </div>
            )}
          </div>

          {/* SECTION 3: SPECIFICATIONS & SPACE OVERVIEW */}
          <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200/80 space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider flex items-center gap-2 text-[#0F172A]">
              <span className="px-2 py-0.5 bg-[#0F766E] text-white text-[10px] font-bold rounded">Step 3 of 5</span>
              Space Specifications &amp; Overview
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5 block">
                  Total Space Available (sq ft)
                </label>
                <Input
                  type="number"
                  name="area"
                  placeholder="e.g. 5533"
                  value={areaVal}
                  onChange={(e) => {
                    setAreaVal(e.target.value);
                    if (e.target.value && (!priceVal || priceVal === "0")) {
                      setPriceVal(String(Number(e.target.value) * 80));
                    }
                  }}
                  className="bg-white border-slate-200 rounded-lg text-sm text-[#0F172A]"
                />
                {Number(areaVal) > 0 && (
                  <p className="text-[11px] text-[#0F766E] font-medium mt-1">
                    Standard base rent @ Ksh 80/sq.ft: <strong>Ksh {(Number(areaVal) * 80).toLocaleString()} /mo</strong>
                  </p>
                )}
              </div>
              <div>
                <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5 block">
                  Floor Size / Space Available (sq ft)
                </label>
                <Input
                  type="text"
                  name="floorPlate"
                  placeholder="e.g. 15,000 sq ft typical floor plate"
                  defaultValue={initialData?.floorPlate || "15,000 sq ft"}
                  className="bg-white border-slate-200 rounded-lg text-sm text-[#0F172A]"
                />
              </div>
            </div>

            {/* Rich Text Editor for Office Space Overview */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider block">
                Office Space Overview &amp; Specifications (Rich Text Editor) *
              </label>
              <div className="bg-white rounded-lg border border-slate-200 overflow-hidden min-h-[220px]">
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={setDescription}
                  placeholder="Describe space layout, office condition, fit-out specifications, and included amenities..."
                  className="h-[180px] mb-12 sm:mb-10"
                  modules={quillModules}
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: BUILDING AMENITIES & FEATURES */}
          <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200/80 space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider flex items-center gap-2 text-[#0F172A]">
              <span className="px-2 py-0.5 bg-[#0F766E] text-white text-[10px] font-bold rounded">Step 4 of 5</span>
              Building Amenities &amp; Features
            </h3>

            {/* Selected Pills */}
            {selectedAmenities.length > 0 && (
              <div className="p-3 bg-white rounded-lg border border-slate-200 mb-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Selected Infrastructure Features ({selectedAmenities.length}):
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedAmenities.map((amenity, i) => (
                    <span
                      key={i}
                      className="bg-[#0F766E]/10 text-[#0F766E] border border-[#0F766E]/20 px-3 py-1 rounded-full flex items-center gap-2 text-xs font-medium max-w-full break-words"
                    >
                      <span className="truncate max-w-[200px] sm:max-w-none">{amenity}</span>
                      <button
                        type="button"
                        onClick={() => toggleAmenity(amenity)}
                        className="text-[#0F766E] hover:text-red-500 rounded-full p-0.5 shrink-0"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Compact Badge Pills */}
            <div className="flex flex-wrap gap-2">
              {COMMERCIAL_AMENITIES.map((amenity) => {
                const selected = selectedAmenities.includes(amenity);
                return (
                  <button
                    type="button"
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-all cursor-pointer ${
                      selected
                        ? "bg-[#0F766E] text-white border-[#0F766E]"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                    }`}
                  >
                    {selected && <Check className="w-3 h-3 shrink-0 stroke-[3]" />}
                    <span>{amenity}</span>
                  </button>
                );
              })}
            </div>

            {/* Custom Amenity Adder */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-3 pt-3 border-t border-slate-200">
              <Input
                placeholder="Add custom specification (e.g. Solar PV 150kW, Water Borehole)"
                value={customAmenity}
                onChange={(e) => setCustomAmenity(e.target.value)}
                className="w-full sm:max-w-md bg-white border-slate-200 rounded-lg text-xs"
              />
              <Button
                type="button"
                onClick={addCustomAmenity}
                className="bg-[#0F172A] hover:bg-slate-800 text-white text-xs rounded-lg px-4 shrink-0"
              >
                Add Feature
              </Button>
            </div>
          </div>

          {/* SECTION 5: MULTI-IMAGE UPLOADER (Up to 20 images) */}
          <div className="bg-slate-50/70 p-4 sm:p-5 rounded-xl border border-slate-200/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4">
              <h3 className="font-semibold text-sm uppercase tracking-wider flex items-center gap-2 text-[#0F172A]">
                <span className="px-2 py-0.5 bg-[#0F766E] text-white text-[10px] font-bold rounded">Step 5 of 5</span>
                Multi-Image Portfolio ({images.length} / 20 Selected) *
              </h3>
              <span className="text-[11px] text-slate-500 font-light">Supports multi-file select and URL additions</span>
            </div>

            {/* Image Previews Grid */}
            {images.length > 0 && (
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {images.map((url, i) => (
                    <div
                      key={i}
                      className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 group bg-slate-100"
                    >
                      <Image
                        src={url}
                        alt={`Asset Image ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImageAt(i)}
                        className="absolute top-1.5 right-1.5 bg-red-600 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity shadow-md cursor-pointer"
                        title="Remove image"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Multi-File Upload Input with Full-Width Mobile Stacking */}
            <div className="p-5 sm:p-6 bg-white rounded-xl border border-dashed border-slate-300 hover:border-[#0F766E] transition-colors text-center w-full">
              <div className="flex flex-col items-center justify-center gap-3 w-full">
                <UploadCloud className="w-9 h-9 text-[#0F766E]" />
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-semibold text-[#0F172A]">Select multiple photography files</p>
                  <p className="text-[11px] text-slate-400">High-resolution photography files supported (up to 50MB per image: JPG, PNG, WebP)</p>
                </div>
                <label className="w-full sm:w-auto cursor-pointer inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0F766E] hover:bg-[#0D9488] text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm">
                  <UploadCloud className="w-4 h-4" />
                  <span>Choose Photos from Device</span>
                  <input
                    type="file"
                    name="files"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </label>
                {selectedFiles.length > 0 && (
                  <p className="text-xs text-[#0F766E] font-medium mt-1">
                    ✓ {selectedFiles.length} {selectedFiles.length === 1 ? "file" : "files"} ready for upload
                  </p>
                )}
              </div>
            </div>

            {/* Direct URL Adder */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2 w-full">
              <Input
                placeholder="Or paste asset image URL (e.g. /images/hq-commercial-tower.jpg)"
                value={directImageUrl}
                onChange={(e) => setDirectImageUrl(e.target.value)}
                className="w-full bg-white border-slate-200 rounded-lg text-xs py-2.5"
              />
              <Button
                type="button"
                onClick={addDirectImage}
                className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-[#0F172A] border border-slate-200 text-xs rounded-lg px-5 py-2.5 shrink-0 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> <span>Add URL</span>
              </Button>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-4 border-t border-slate-200 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs text-slate-500 font-light text-center sm:text-left">
              Space listing will be published to the available commercial lease directory.
            </span>
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-[#0F766E] hover:bg-[#0D9488] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              {loading
                ? `Processing Space (${uploadProgress}%)...`
                : initialData
                ? "Update Space"
                : "Register Commercial Space for Lease"}
            </Button>
          </div>
        </form>

        {/* ─── UPLOAD PROGRESS MODAL OVERLAY ─── */}
        {uploadStatus.show && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0F172A]/80 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 flex flex-col items-center gap-5">
              <Loader2 className="w-10 h-10 animate-spin text-[#0F766E]" />
              <div className="text-center">
                <p className="font-bold text-[#0F172A] text-base" style={{ fontFamily: "Cinzel, Georgia, serif" }}>
                  Uploading
                </p>
                <p className="text-slate-500 text-xs mt-1 font-light max-w-xs mx-auto">{uploadStatus.message}</p>
              </div>
              <div className="w-full">
                <div className="flex justify-between text-[10px] text-slate-400 mb-1.5 font-medium">
                  <span>Progress</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0F766E] to-[#14B8A6] rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                {uploadStatus.total > 0 && (
                  <p className="text-[10px] text-slate-400 mt-2 text-center">
                    Image {Math.min(uploadStatus.current, uploadStatus.total)} of {uploadStatus.total}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
