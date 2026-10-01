"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FaInstagram, FaXTwitter, FaWhatsapp } from "react-icons/fa6";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  propertyInterest: "",
  budgetRange: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactDetails = [
    {
      icon: <MapPin className="w-5 h-5 text-[#14B8A6] shrink-0 mt-0.5" />,
      label: "Nairobi, Kenya",
    },
    {
      icon: <Phone className="w-5 h-5 text-[#14B8A6] shrink-0 mt-0.5" />,
      label: "+254 768 096 084",
    },
    {
      icon: <Mail className="w-5 h-5 text-[#14B8A6] shrink-0 mt-0.5" />,
      label: "info@pm-consult.com",
    },
    {
      icon: <Clock className="w-5 h-5 text-[#14B8A6] shrink-0 mt-0.5" />,
      label: "Mon–Fri, 8:00 AM – 6:00 PM",
    },
  ];

  const inputClass =
    "border border-[#E2E8F0] focus:border-[#0F766E] outline-none px-4 py-3 w-full text-[#0F172A] text-sm bg-white transition-colors duration-200";

  return (
    <div className="min-h-screen flex flex-col lg:flex-row pt-16">
      {/* ── LEFT PANEL ── */}
      <div className="relative bg-[#0F172A] text-white w-full lg:w-2/5 p-6 sm:p-10 lg:p-16 flex flex-col justify-between overflow-hidden">
        {/* Background image overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/architectural-commercial.jpg"
            alt="Commercial architecture"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover opacity-10"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-12">
          {/* Heading */}
          <div className="flex flex-col gap-4">
            <h1
              className="font-bold text-4xl lg:text-5xl leading-tight"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Let&apos;s Build Something Significant
            </h1>
            <p className="text-white/60 font-light text-base leading-relaxed max-w-sm">
              Whether you&apos;re acquiring, divesting, or developing — our
              team is ready to guide you through every step of your commercial
              property journey.
            </p>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-5">
            {contactDetails.map(({ icon, label }) => (
              <div key={label} className="flex items-start gap-3">
                {icon}
                <span className="text-white/70 text-sm leading-relaxed">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="relative z-10 flex items-center gap-5 mt-12">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white/50 hover:text-[#14B8A6] transition-colors duration-200 cursor-pointer"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="text-white/50 hover:text-[#14B8A6] transition-colors duration-200 cursor-pointer"
          >
            <FaXTwitter size={20} />
          </a>
          <a
            href="https://wa.me/254768096084"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-white/50 hover:text-[#14B8A6] transition-colors duration-200 cursor-pointer"
          >
            <FaWhatsapp size={20} />
          </a>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="bg-white w-full lg:w-3/5 p-6 sm:p-10 lg:p-16 flex items-center justify-center">
        <div className="w-full max-w-xl">
          <h2
            className="text-2xl text-[#0F172A] mb-2"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Send an Enquiry
          </h2>
          <p className="text-[#64748B] text-sm mb-10">
            Complete the form below and a member of our advisory team will
            respond within one business day.
          </p>

          {submitted ? (
            <div className="border-l-4 border-[#0F766E] pl-6 py-4">
              <p
                className="text-[#0F172A] text-lg font-medium"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Thank You
              </p>
              <p className="text-[#64748B] text-sm mt-2 leading-relaxed">
                Your enquiry has been received. We&apos;ll be in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest text-[#64748B]">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Jane Mwangi"
                  className={inputClass}
                />
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-widest text-[#64748B]">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="jane@example.com"
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-widest text-[#64748B]">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+254 700 000 000"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Property Interest */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest text-[#64748B]">
                  Property Interest
                </label>
                <select
                  name="propertyInterest"
                  value={form.propertyInterest}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="Commercial Office">Commercial Office</option>
                  <option value="Retail Space">Retail Space</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Land">Land</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Budget Range */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest text-[#64748B]">
                  Budget Range
                </label>
                <select
                  name="budgetRange"
                  value={form.budgetRange}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select a range
                  </option>
                  <option value="Below 50M">Below KES 50M</option>
                  <option value="50M-200M">KES 50M – 200M</option>
                  <option value="200M-500M">KES 200M – 500M</option>
                  <option value="500M+">KES 500M+</option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-widest text-[#64748B]">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us more about your requirements…"
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="bg-[#0F766E] hover:bg-[#0D9488] text-white w-full py-4 text-sm tracking-widest uppercase cursor-pointer transition-colors duration-200 mt-2"
              >
                Submit Enquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
