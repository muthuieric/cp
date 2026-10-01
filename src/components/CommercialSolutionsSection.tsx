import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export default function CommercialSolutionsSection() {
  return (
    <section className="py-16 sm:py-24 bg-neutral-950 text-white relative overflow-hidden">
      {/* Subtle ambient grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Services Header & Description */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium border-b border-neutral-700 pb-1">
                Services
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white leading-tight">
              Architectural Solutions for <br className="hidden sm:inline" />
              <span className="font-normal text-neutral-100">Growing Businesses</span>
            </h2>

            <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed max-w-2xl">
              Commercial spaces that enhance customer experience and business efficiency through smart layouts and aesthetics — reflecting your brand identity and elevating retail, office, or hospitality hubs.
            </p>

            {/* Feature Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border border-neutral-700 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white tracking-wide">Brand-Reflective Spaces</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">Custom facades & interiors tailored to corporate vision</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border border-neutral-700 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white tracking-wide">High-Yield Spatial Layouts</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">Optimized square footage for maximum utility and traffic flow</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border border-neutral-700 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white tracking-wide">Sustainable Certification</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">Energy-efficient lighting, solar orientation, and HVAC design</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border border-neutral-700 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white tracking-wide">End-to-End Execution</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">From blueprint approvals to final turnkey handover</p>
                </div>
              </div>
            </div>

            {/* CTA Link */}
            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-white text-neutral-950 text-xs font-semibold uppercase tracking-[0.2em] rounded-lg hover:bg-neutral-200 transition-colors shadow-lg"
              >
                <span>Consult on your project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Architectural Pillar Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 bg-neutral-900 group">
              <div className="relative h-[480px] sm:h-[540px] w-full">
                <Image
                  src="/images/architectural-commercial.jpg"
                  alt="Design with purpose"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                {/* Overlay Text inside photo matching screenshot style */}
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 block mb-1">
                    Philosophy
                  </span>
                  <h3 className="text-2xl font-light text-white tracking-tight">
                    Design With Purpose
                  </h3>
                  <p className="text-xs text-neutral-300 font-light mt-2 leading-relaxed">
                    Transforming physical space into an enduring catalyst for commerce, living, and community.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
