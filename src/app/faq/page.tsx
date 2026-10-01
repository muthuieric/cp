"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    title: "Investment & Acquisition",
    items: [
      {
        question:
          "What types of commercial properties does PM specialise in?",
        answer:
          "PM Commercial focuses on Grade-A office towers, mixed-use retail developments, industrial warehousing, and strategic land parcels across Kenya's key urban corridors. Our advisory mandate spans both income-generating assets and development-ready land suitable for institutional and high-net-worth investors. Each mandate is assessed for its yield potential, capital appreciation outlook, and alignment with our clients' portfolio strategy.",
      },
      {
        question: "What is the minimum investment threshold?",
        answer:
          "Our mandates typically commence from KES 50 million, though this varies depending on asset class and market conditions. We work with a range of investors — from family offices making their first commercial acquisition to institutional funds repositioning large-scale portfolios. Initial advisory consultations are obligation-free and help us tailor our recommendations to your specific capital deployment goals.",
      },
    ],
  },
  {
    title: "Property Management",
    items: [
      {
        question:
          "Do you provide property management services after acquisition?",
        answer:
          "Yes. PM Commercial offers full-spectrum asset and property management services covering facilities maintenance, lease administration, service-charge reconciliation, and periodic performance reporting. Our management mandate is structured to protect and grow your asset value from day one of ownership. Clients receive a dedicated relationship manager and quarterly investment performance reviews.",
      },
      {
        question: "How are tenant relationships managed?",
        answer:
          "We maintain proactive, structured engagement with all tenants through our in-house tenant liaison team. Regular occupancy health-checks, lease renewal negotiations, and dispute resolution protocols are embedded in every management agreement. Our goal is to sustain occupancy rates above 90% while minimising rent arrears and vacancy periods for our clients.",
      },
    ],
  },
  {
    title: "Legal & Financial",
    items: [
      {
        question:
          "How does PM handle due diligence for commercial acquisitions?",
        answer:
          "PM Commercial coordinates a comprehensive due diligence process that encompasses title verification, land-use and zoning compliance, structural surveys, environmental assessments, and financial underwriting of existing tenancies. We work alongside our clients' legal counsel or can recommend vetted commercial property advocates. All findings are consolidated into a structured due diligence report prior to exchange of contracts.",
      },
      {
        question: "What are typical transaction timelines?",
        answer:
          "A standard commercial acquisition in Kenya typically completes within 60 to 120 days from execution of the Letter of Intent, subject to due diligence findings and any regulatory consents required. Complex transactions involving multiple titles or development approvals may extend to 180 days. PM Commercial manages the entire transaction timeline, providing clients with milestone updates throughout the process.",
      },
    ],
  },
];

function AccordionItem({ question, answer }: FAQItem) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#E2E8F0]">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
        aria-expanded={open}
      >
        <span className="font-medium text-[#0F172A] text-sm sm:text-base pr-4 group-hover:text-[#0F766E] transition-colors duration-200">
          {question}
        </span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-[#0F766E] shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#64748B] shrink-0 group-hover:text-[#0F766E] transition-colors duration-200" />
        )}
      </button>

      {open && (
        <div className="border-l-4 border-[#0F766E] pl-4 pb-5">
          <p className="text-[#64748B] font-light leading-relaxed text-sm sm:text-base">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

function FAQSection({ title, items }: FAQCategory) {
  return (
    <section className="mb-14">
      <h3
        className="text-xl text-[#0F172A] border-b border-[#0F766E] pb-2 mb-6"
        style={{ fontFamily: "Cinzel, serif" }}
      >
        {title}
      </h3>
      <div>
        {items.map((item) => (
          <AccordionItem key={item.question} {...item} />
        ))}
      </div>
    </section>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* ── HERO ── */}
      <section className="bg-[#0F172A] py-20 px-8 text-center">
        <h1
          className="text-white text-4xl lg:text-5xl font-bold leading-tight"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          Frequently Asked Questions
        </h1>
        <p className="text-white/50 mt-4 text-base font-light max-w-xl mx-auto leading-relaxed">
          Everything you need to know about working with PM Commercial — from
          initial enquiry through to post-acquisition management.
        </p>
        {/* Teal underline decoration */}
        <div className="mx-auto mt-6 w-16 h-0.5 bg-[#0F766E]" />
      </section>

      {/* ── CONTENT ── */}
      <section className="bg-[#FAFAF9] py-20">
        <div className="max-w-4xl mx-auto px-6">
          {faqData.map((category) => (
            <FAQSection key={category.title} {...category} />
          ))}

          {/* CTA at bottom */}
          <div className="mt-6 border border-[#E2E8F0] bg-white p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p
                className="text-[#0F172A] font-medium text-lg"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Still have questions?
              </p>
              <p className="text-[#64748B] text-sm mt-1">
                Our advisory team is available Monday to Friday, 8 AM – 6 PM.
              </p>
            </div>
            <a
              href="/contact"
              className="bg-[#0F766E] hover:bg-[#0D9488] text-white px-8 py-3.5 text-sm tracking-widest uppercase cursor-pointer transition-colors duration-200 shrink-0"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
