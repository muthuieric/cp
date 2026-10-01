import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative px-3 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-6 sm:pb-10 max-w-[1440px] mx-auto">
      {/* Hero Card Container */}
      <div className="relative rounded-2xl md:rounded-3xl overflow-hidden min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex flex-col justify-between p-6 sm:p-10 lg:p-14 shadow-2xl">
        
        {/* Background Image - Modernist Luxury Villa */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-villa.jpg"
            alt="Modern Architectural Villa"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center transform scale-100 transition-transform duration-1000 ease-out hover:scale-105"
          />
        </div>

        {/* Ambient Gradient Overlay for Contrast & Editorial Mood */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

        {/* Top-Left Main Heading & Call To Action */}
        <div className="relative z-10 pt-4 sm:pt-8 max-w-2xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-light text-white tracking-tight leading-[1.08] sm:leading-[1.05]">
            Where Vision Meets <br />
            Structure, And Design <br />
            <span className="font-normal">BecomesPurpose.</span>
          </h1>

          <div className="mt-6 sm:mt-8">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2.5 text-white/90 hover:text-white text-xs sm:text-sm tracking-[0.2em] uppercase font-medium transition-all group duration-300 border-b border-white/40 pb-1 hover:border-white"
            >
              <span>Discover now</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>

        {/* Bottom Integrated Stats Bar */}
        <div className="relative z-10 pt-10 sm:pt-16 mt-auto">
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 md:gap-14 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 w-fit max-w-full">
            
            {/* Stat 1 */}
            <div className="flex flex-col">
              <div className="text-2xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
                70<span className="text-neutral-400 font-extralight">+</span>
              </div>
              <div className="text-[11px] sm:text-xs text-neutral-300 uppercase tracking-widest font-normal mt-1">
                Satisfied Client
              </div>
            </div>

            {/* Divider */}
            <div className="h-9 sm:h-12 w-[1px] bg-white/20" />

            {/* Stat 2 */}
            <div className="flex flex-col">
              <div className="text-2xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
                200<span className="text-neutral-400 font-extralight">+</span>
              </div>
              <div className="text-[11px] sm:text-xs text-neutral-300 uppercase tracking-widest font-normal mt-1">
                Project Completed
              </div>
            </div>

            {/* Divider */}
            <div className="h-9 sm:h-12 w-[1px] bg-white/20" />

            {/* Stat 3 */}
            <div className="flex flex-col">
              <div className="text-2xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
                10<span className="text-neutral-400 font-extralight">+</span>
              </div>
              <div className="text-[11px] sm:text-xs text-neutral-300 uppercase tracking-widest font-normal mt-1">
                Year in business
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

