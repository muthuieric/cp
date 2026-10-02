"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  X,
  Calendar,
  Clock,
  Phone,
  MessageSquare,
  FileText,
  CheckCircle2,
  Building2,
  Mail,
  User,
  ExternalLink,
  Download,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

interface PropertyInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "viewing" | "brochure";
  propertyName: string;
  propertyId: string;
  propertyLocation?: string;
  priceDisplay?: string;
}

export default function PropertyInquiryModal({
  isOpen,
  onClose,
  type,
  propertyName,
  propertyId,
  propertyLocation,
  priceDisplay,
}: PropertyInquiryModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Morning (9:00 AM - 12:00 PM)");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const isViewing = type === "viewing";

  const whatsappMessage = encodeURIComponent(
    `Hi PM Commercial, I am interested in ${isViewing ? "scheduling a viewing for" : "receiving the leasing brochure for"} ${propertyName} (ID: ${propertyId}) at ${propertyLocation || "Nairobi"}. Could you share available details?`
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email && !phone) {
      toast.error("Please provide either an email or phone number.");
      return;
    }

    setLoading(true);

    try {
      // Send inquiry lead to contact API or log
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "Prospective Tenant",
          email,
          phone,
          propertyInterest: propertyName,
          propertyId,
          inquiryType: isViewing ? "Tour Request" : "Brochure / Floor Plan Request",
          preferredDate: date,
          preferredTime: timeSlot,
          message: message || `${isViewing ? "Viewing tour" : "Brochure download"} requested for ${propertyName}`,
        }),
      }).catch(() => null);

      setSubmitted(true);
      toast.success(
        isViewing
          ? "Viewing Request Received!"
          : "Floor Plan & Pricing Sheet Dispatched!",
        {
          description: `Our leasing advisor will contact you at ${phone || email}.`,
        }
      );
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadDemoSheet = () => {
    // Generate clean text/CSV data download for tenant floor plan
    const content = `PM COMMERCIAL - LEASING DOSSIER & SPECIFICATIONS\n\nProperty: ${propertyName}\nReference ID: ${propertyId}\nLocation: ${propertyLocation || "Nairobi, Kenya"}\nAsking Rent: ${priceDisplay || "Available upon inquiry"}\nStatus: Available for Lease\n\nContact Leasing Desk:\nPhone: +254 768 096 084\nEmail: info@pm-consult.com\nWebsite: https://pm-consult.com\n`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${propertyName.toLowerCase().replace(/[^a-z0-9]/g, "-")}-spec-sheet.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Specification sheet downloaded!");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0F172A]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0F172A] px-6 py-5 text-white flex items-start justify-between">
          <div>
            <span className="text-[#14B8A6] text-[10px] tracking-[0.25em] uppercase font-bold block mb-1">
              {isViewing ? "Schedule a Viewing" : "Leasing Brochure & Floor Plan"}
            </span>
            <h3
              className="text-lg font-bold leading-snug"
              style={{ fontFamily: "Cinzel, Georgia, serif" }}
            >
              {propertyName}
            </h3>
            {propertyLocation && (
              <p className="text-white/60 text-xs mt-0.5">{propertyLocation}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-[#0F766E]/10 text-[#0F766E] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4
                  className="text-xl font-bold text-[#0F172A]"
                  style={{ fontFamily: "Cinzel, Georgia, serif" }}
                >
                  {isViewing ? "Viewing Request Logged" : "Dossier Dispatched"}
                </h4>
                <p className="text-slate-500 text-xs mt-1 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-800">{name || "Tenant"}</strong>. Our dedicated commercial leasing manager will connect with you within 2 business hours.
                </p>
              </div>

              {!isViewing && (
                <button
                  type="button"
                  onClick={handleDownloadDemoSheet}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Spec Sheet Now</span>
                </button>
              )}

              {/* Direct Reach */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/254768096084?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 text-xs font-semibold rounded-lg transition-colors"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
                <a
                  href="tel:+254768096084"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#0F766E]" />
                  <span>Call +254 768 096 084</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form Fields */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Your Full Name / Company
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Mwangi or Safaricom PLC"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Corporate Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+254 700 000 000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] outline-none"
                    />
                  </div>
                </div>
              </div>

              {isViewing && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Preferred Tour Date
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Preferred Time
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] outline-none bg-white"
                      >
                        <option>Morning (9:00 AM - 12:00 PM)</option>
                        <option>Early Afternoon (12:00 PM - 2:00 PM)</option>
                        <option>Late Afternoon (2:00 PM - 5:00 PM)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Specific Space Requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Need space for 25 people with executive boardroom and dedicated parking."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] outline-none resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-lg transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
              >
                <span>{loading ? "Processing..." : isViewing ? "Confirm Viewing Request" : "Request Floor Plan & Pricing"}</span>
              </button>

              {/* Quick Actions (Direct Phone & WhatsApp) */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Need immediate answers?</span>
                <div className="flex items-center gap-3">
                  <a
                    href={`https://wa.me/254768096084?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#128C7E] hover:underline font-semibold"
                  >
                    <FaWhatsapp className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <span className="text-slate-300">|</span>
                  <a
                    href="tel:+254768096084"
                    className="inline-flex items-center gap-1 text-[#0F766E] hover:underline font-semibold"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call Us</span>
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
