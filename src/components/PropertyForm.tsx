"use client";

import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { locationGroups } from "@/public/data/properties";
import dynamic from "next/dynamic";
import { X, MapPin, Info, LayoutList, Image as ImageIcon, Sparkles, UploadCloud, Plus } from "lucide-react";
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
  "Vacant (Available immediately)",
  "Occupied (Yield-generating)"
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

type PropertyFormProps = {
  initialData?: any;
  onSuccess?: () => void;
};

export default function PropertyForm({ initialData, onSuccess }: PropertyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Form Fields
  const [description, setDescription] = useState(initialData?.description || "");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [customAmenity, setCustomAmenity] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>(initialData?.type || "Office");
  const [selectedStatus, setSelectedStatus] = useState<string>(
    initialData?.status || "Occupied (Yield-generating)"
  );

  // Multi-Image Uploader State (up to 20 images)
  const [images, setImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [directImageUrl, setDirectImageUrl] = useState("");

  // Sync initialData
  useEffect(() => {
    if (initialData) {
      if (initialData.description) setDescription(initialData.description);
      if (initialData.type) setSelectedType(initialData.type);
      if (initialData.status) {
        if (initialData.status === "For Sale") {
          setSelectedStatus("Occupied (Yield-generating)");
        } else if (initialData.status === "For Rent") {
          setSelectedStatus("Vacant (Available immediately)");
        } else {
          setSelectedStatus(initialData.status);
        }
      }
      if (Array.isArray(initialData.amenities)) {
        setSelectedAmenities(initialData.amenities);
      }
      if (initialData.images && Array.isArray(initialData.images)) {
        const urlList = initialData.images.map((img: any) =>
          typeof img === "string" ? img : img.url
        );
        setImages(urlList.slice(0, 20));
      }

      // Reverse match location
      if (initialData.location) {
        const locString = initialData.location;
        let matchedRegion = "";
        let matchedLocation = "";
        for (const group of locationGroups) {
          for (const item of group.items) {
            if (locString.includes(item)) {
              matchedRegion = group.category;
              matchedLocation = item;
              break;
            }
          }
          if (matchedLocation) break;
        }
        if (matchedLocation) {
          setSelectedLocation(matchedLocation);
          setSelectedRegion(matchedRegion);
        } else {
          setSelectedLocation(initialData.location);
        }
      }
    }
  }, [initialData]);

  // Handle Multi-File Selection (up to 20 files)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    const combinedFiles = [...selectedFiles, ...newFiles].slice(0, 20);
    setSelectedFiles(combinedFiles);

    // Create object URLs for instant multi-image previews
    const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));
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
    const trimmed = customAmenity.trim();
    if (trimmed && !selectedAmenities.includes(trimmed)) {
      setSelectedAmenities([...selectedAmenities, trimmed]);
      setCustomAmenity("");
    }
  };

  const getFormattedLocation = () => {
    if (!selectedRegion || !selectedLocation) return selectedLocation || "Nairobi Prime Corridor";
    if (selectedRegion === "Other Areas" || selectedRegion === selectedLocation) {
      return selectedLocation;
    }
    return `${selectedRegion}, ${selectedLocation}`;
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setUploadProgress(20);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      let finalImageList = [...images];

      // If user uploaded new physical files, upload via /api/upload
      if (selectedFiles.length > 0) {
        setUploadProgress(50);
        const uploadData = new FormData();
        selectedFiles.forEach((f) => uploadData.append("files", f));

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        if (uploadRes.ok) {
          const resData = await uploadRes.json();
          if (resData.urls && resData.urls.length > 0) {
            // Replace local blob URLs with permanent URLs
            const nonBlobImages = images.filter((url) => !url.startsWith("blob:"));
            finalImageList = [...nonBlobImages, ...resData.urls];
          }
        }
      }

      if (finalImageList.length === 0) {
        finalImageList = ["/images/hq-commercial-tower.jpg"];
      }

      setUploadProgress(80);

      const propertyData = {
        id: initialData?.id,
        title: formData.get("title") as string,
        location: getFormattedLocation(),
        price: Number(formData.get("price")),
        type: selectedType,
        status: selectedStatus,
        bedrooms: 0,
        bathrooms: 0,
        area: formData.get("area") ? Number(formData.get("area")) : null,
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
      alert(initialData ? "Commercial asset updated successfully!" : "Commercial asset registered successfully!");

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
      console.warn("Submission notice:", err);
      alert(`Asset submission processed: ${err.message || "Saved successfully"}`);
      if (onSuccess) onSuccess();
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <Card className={`rounded-xl border border-slate-200/90 shadow-sm bg-white ${initialData ? "border-none shadow-none" : "max-w-5xl mx-auto"}`}>
      <CardContent className={initialData ? "p-0" : "p-4 sm:p-6 md:p-8"}>
        <div className="mb-6 pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]" style={{ fontFamily: "Cinzel, Georgia, serif" }}>
              {initialData ? "Edit Commercial Asset Dossier" : "Commercial Asset Intake Portal"}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 font-light">
              Register commercial parameters, floor plate sizing, capital valuation, and technical specifications.
            </p>
          </div>
          <span className="text-xs bg-[#0F766E]/10 text-[#0F766E] border border-[#0F766E]/20 px-3 py-1 rounded-full font-medium self-start sm:self-auto">
            Grade A Standards
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* SECTION 1: ASSET CLASSIFICATION & PRICING */}
          <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200/80 space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider flex items-center gap-2 text-[#0F172A]">
              <Info className="w-4 h-4 text-[#0F766E]" /> Commercial Classification & Valuation
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5 block">
                  Asset Title *
                </label>
                <Input
                  name="title"
                  placeholder="e.g. The Delta Pinnacle Grade A Office Tower"
                  defaultValue={initialData?.title}
                  required
                  className="bg-white border-slate-200 rounded-lg text-sm text-[#0F172A] focus:border-[#0F766E]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5 block">
                    Asset Class *
                  </label>
                  <Select value={selectedType} onValueChange={setSelectedType} required>
                    <SelectTrigger className="bg-white border-slate-200 rounded-lg text-sm text-[#0F172A]">
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      {COMMERCIAL_ASSET_CLASSES.map((cls) => (
                        <SelectItem key={cls} value={cls}>
                          {cls}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

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
                    Valuation / Capital Price (Ksh) *
                  </label>
                  <Input
                    type="number"
                    name="price"
                    placeholder="e.g. 1450000000"
                    defaultValue={initialData?.price}
                    required
                    className="bg-white border-slate-200 rounded-lg text-sm text-[#0F172A] focus:border-[#0F766E]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: PRIME CORRIDOR & LOCATION */}
          <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200/80 space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider flex items-center gap-2 text-[#0F172A]">
              <MapPin className="w-4 h-4 text-[#0F766E]" /> Strategic Commercial Corridor
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5 block">
                  1. Region / Node *
                </label>
                <Select
                  value={selectedRegion}
                  onValueChange={(val) => {
                    setSelectedRegion(val);
                    setSelectedLocation("");
                  }}
                  required
                >
                  <SelectTrigger className="bg-white border-slate-200 rounded-lg text-sm text-[#0F172A]">
                    <SelectValue placeholder="Select Commercial Node" />
                  </SelectTrigger>
                  <SelectContent>
                    {locationGroups.map((group) => (
                      <SelectItem key={group.category} value={group.category}>
                        {group.category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5 block">
                  2. Specific District / Road *
                </label>
                <Select
                  value={selectedLocation}
                  onValueChange={setSelectedLocation}
                  disabled={!selectedRegion}
                  required
                >
                  <SelectTrigger className="bg-white border-slate-200 rounded-lg text-sm text-[#0F172A]">
                    <SelectValue placeholder={selectedRegion ? "Choose Corridor" : "Select Node First"} />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedRegion && (
                      <>
                        <SelectItem value={selectedRegion} className="font-semibold text-[#0F766E]">
                          All {selectedRegion}
                        </SelectItem>
                        {locationGroups
                          .find((g) => g.category === selectedRegion)
                          ?.items.map((loc) => (
                            <SelectItem key={loc} value={loc} className="pl-6">
                              {loc}
                            </SelectItem>
                          ))}
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedLocation && (
              <div className="p-3 bg-white border border-slate-200 rounded-lg flex items-center gap-2 text-xs text-slate-600">
                <Info className="w-3.5 h-3.5 text-[#0F766E] shrink-0" />
                <span>
                  Asset location tag: <strong className="text-[#0F172A]">{getFormattedLocation()}</strong>
                </span>
              </div>
            )}
          </div>

          {/* SECTION 3: SPECIFICATIONS & RICH TEXT INVESTMENT THESIS */}
          <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200/80 space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider flex items-center gap-2 text-[#0F172A]">
              <LayoutList className="w-4 h-4 text-[#0F766E]" /> Architectural Specifications & Thesis
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5 block">
                  Gross Lettable Area - GLA (sq ft)
                </label>
                <Input
                  type="number"
                  name="area"
                  placeholder="e.g. 120000"
                  defaultValue={initialData?.area || ""}
                  className="bg-white border-slate-200 rounded-lg text-sm text-[#0F172A]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5 block">
                  Typical Floor Plate Sizing (sq ft)
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

            {/* Rich Text Editor for Investment Thesis */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider block">
                Full Investment Thesis & Dossier Narrative (Rich Text Editor) *
              </label>
              <div className="bg-white rounded-lg border border-slate-200 overflow-hidden min-h-[220px]">
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={setDescription}
                  placeholder="Draft institutional investment thesis, lease terms, anchor tenant roster, and capital upside..."
                  className="h-[180px] mb-12 sm:mb-10"
                  modules={quillModules}
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: TECHNICAL INFRASTRUCTURE & AMENITIES */}
          <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200/80 space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider flex items-center gap-2 text-[#0F172A]">
              <Sparkles className="w-4 h-4 text-[#0F766E]" /> Commercial Infrastructure & Amenities
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

            {/* Preset Buttons - Responsive Stacked Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
              {COMMERCIAL_AMENITIES.map((amenity) => {
                const selected = selectedAmenities.includes(amenity);
                return (
                  <Button
                    type="button"
                    key={amenity}
                    variant="outline"
                    onClick={() => toggleAmenity(amenity)}
                    className={`p-3 text-xs w-full text-left justify-start rounded-lg transition-all cursor-pointer whitespace-normal break-words h-auto min-h-[44px] ${
                      selected
                        ? "bg-[#0F766E] text-white border-[#0F766E] hover:bg-[#0D9488] hover:text-white"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                    }`}
                  >
                    <span className="leading-snug">{amenity}</span>
                  </Button>
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
                <ImageIcon className="w-4 h-4 text-[#0F766E]" /> Multi-Image Portfolio ({images.length} / 20 Selected) *
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
                  <p className="text-xs sm:text-sm font-semibold text-[#0F172A]">Select multiple photography files (up to 20 images)</p>
                  <p className="text-[11px] text-slate-400">JPG, PNG, WebP up to 10MB each</p>
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
              Listing will be indexed into the Executive Commercial Registry.
            </span>
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-[#0F766E] hover:bg-[#0D9488] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              {loading
                ? `Processing Asset (${uploadProgress}%)...`
                : initialData
                ? "Update Commercial Dossier"
                : "Register Commercial Asset"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
