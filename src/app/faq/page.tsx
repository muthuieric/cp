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
    title: "Office & Commercial Leasing",
    items: [
      {
        question:
          "What types of commercial spaces does PM Commercial offer for lease?",
        answer:
          "PM Commercial focuses on Grade-A office suites, modular workspaces, commercial floors, and prime retail spaces across Nairobi's top commercial corridors, including Westlands, Kilimani, Upper Hill, and Karen. Every space is curated for quality infrastructure, reliable backup power, high-speed fiber connectivity, and dedicated parking.",
      },
      {
        question: "What are the standard commercial lease terms and duration?",
        answer:
          "Commercial lease terms in Nairobi typically range from 2 to 6 years, with flexible options and break clauses available for expanding enterprises. Standard agreements outline transparent monthly rent, service charge allocations, escalation rates (typically 5–7.5% biennial), and rent-free fit-out periods.",
      },
      {
        question: "What does the commercial service charge cover?",
        answer:
          "The service charge covers essential building infrastructure and services: 24/7 security and access control, CCTV monitoring, backup generator maintenance and fuel, borehole water supply, common area cleaning, lift servicing, fire safety systems, and garbage collection.",
      },
    ],
  },
  {
    title: "Property & Facilities Management",
    items: [
      {
        question:
          "Do you provide on-site property and facilities management?",
        answer:
          "Yes. PM Commercial oversees comprehensive building operations, including preventative equipment maintenance, utility monitoring, security personnel supervision, and daily facility management to ensure smooth day-to-day operations for all tenants.",
      },
      {
        question: "How is maintenance and tenant support handled during our lease?",
        answer:
          "Tenants have direct access to our commercial facilities desk for any maintenance requests, technical inquiries, or emergency support. We maintain rapid response protocols for critical power, water, and HVAC services to guarantee minimal disruption to your business.",
      },
    ],
  },
  {
    title: "Viewing, Space Planning & Move-In",
    items: [
      {
        question:
          "How do I schedule a viewing or request a space floor plan?",
        answer:
          "You can schedule a private physical or virtual walkthrough directly through our website, via WhatsApp (+254 768 096 084), or by contacting our leasing desk. We provide detailed floor plates, layout options, and pricing breakdowns prior to your visit.",
      },
      {
        question: "What is the typical timeline from viewing to moving into an office?",
        answer:
          "For fitted, move-in-ready suites, handover can take place within 7 to 14 days following lease signing and deposit confirmation. For shell-and-core units requiring custom fit-outs, we coordinate with the landlord to grant a dedicated rent-free fit-out period (typically 30 to 90 days) before lease commencement.",
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
          Everything you need to know about leasing commercial offices and workspaces with PM Commercial, from initial viewing through to move-in.
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
