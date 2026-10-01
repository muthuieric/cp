import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function AboutIntroSection() {
  return (
    <section className="py-16 sm:py-24 bg-white text-neutral-900 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tag & Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Tag + Large Editorial Heading */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-neutral-900 border-b border-neutral-900 pb-1 inline-block">
                About Us
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-950 leading-[1.15]">
              Innovative Architecture for a Changing World
            </h2>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-neutral-900 hover:text-neutral-600 transition-colors group"
              >
                <span>Read our philosophy</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Paragraph Content */}
          <div className="lg:col-span-6 space-y-6 lg:pt-8 text-neutral-600 font-light leading-relaxed">
            <p className="text-base sm:text-lg text-neutral-800 font-normal">
              Architecture is more than structures — it&apos;s about creating spaces that enrich daily life. We blend thoughtful design with function, sustainability, and timeless beauty to craft residential and commercial landmarks.
            </p>
            <p className="text-sm sm:text-base text-neutral-500">
              From bespoke private residences in prime enclaves to forward-thinking commercial hubs, every project is an intentional dialogue between environment, materiality, and human experience.
            </p>

            {/* Quick architectural pillar tags */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-100 text-center">
              <div>
                <div className="text-xs uppercase tracking-widest font-semibold text-neutral-900">01. Precision</div>
                <div className="text-[11px] text-neutral-400 mt-1">Exact engineering</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest font-semibold text-neutral-900">02. Context</div>
                <div className="text-[11px] text-neutral-400 mt-1">Site-specific form</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest font-semibold text-neutral-900">03. Elegance</div>
                <div className="text-[11px] text-neutral-400 mt-1">Timeless aesthetics</div>
              </div>
            </div>
          </div>

        </div>

        {/* Visual Showcase Ribbon Below */}
        <div className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative h-72 sm:h-80 rounded-xl overflow-hidden group">
            <Image
              src="/images/architectural-1.jpg"
              alt="Architectural Villa"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] uppercase tracking-widest font-medium text-neutral-300">Residential</span>
              <h3 className="text-base font-medium tracking-tight">The Horizon Pavilion</h3>
            </div>
          </div>

          <div className="relative h-72 sm:h-80 rounded-xl overflow-hidden group">
            <Image
              src="/images/architectural-2.jpg"
              alt="Interior & Facade"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] uppercase tracking-widest font-medium text-neutral-300">Modernist</span>
              <h3 className="text-base font-medium tracking-tight">Cantilever Residence</h3>
            </div>
          </div>

          <div className="relative h-72 sm:h-80 rounded-xl overflow-hidden group">
            <Image
              src="/images/architectural-commercial.jpg"
              alt="Commercial Architecture"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] uppercase tracking-widest font-medium text-neutral-300">Commercial</span>
              <h3 className="text-base font-medium tracking-tight">Atrium Business Tower</h3>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
