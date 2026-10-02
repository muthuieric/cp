import Image from "next/image";
import Link from "next/link";
import { Building2, BarChart2, Shield, Globe, ArrowRight } from "lucide-react";
import { getSampleProperties } from "@/lib/sampleProperties";

export const dynamic = "force-dynamic";

export default function Home() {
  const properties = getSampleProperties().slice(0, 6);
  const featured = properties[0];
  const rest = properties.slice(1, 5);

  const stats = [
    { value: "150+", label: "Properties" },
    { value: "12 Years", label: "Experience" },
    // { value: "Ksh 50B+", label: "Transacted" },
  ];

  const whyCards = [
    {
      icon: Building2,
      title: "Prime Commercial Corridors",
      body: "Handpicked Grade A office towers and commercial spaces located in Nairobi's most accessible business nodes.",
    },
    {
      icon: BarChart2,
      title: "Flexible Workspace Formats",
      body: "From fully fitted, plug-and-play offices to expansive column-free floor plates tailored to your team.",
    },
    {
      icon: Shield,
      title: "Transparent Lease Terms",
      body: "Clear base rent, inclusive service charge breakdowns, and predictable agreements with zero surprise costs.",
    },
    {
      icon: Globe,
      title: "Dedicated Tenant Support",
      body: "Reliable 24/7 power backup, high-speed fiber redundancy, top-tier security, and on-site facility management.",
    },
  ];

  const formatPrice = (price: number) =>
    price >= 1_000_000
      ? `Ksh ${(price / 1_000_000).toFixed(1)}M/mo`
      : `Ksh ${price.toLocaleString()}/mo`;

  return (
    <>
      {/* ── MARQUEE KEYFRAMES ─────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&display=swap');

        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 28s linear infinite;
        }
        .font-cinzel { font-family: 'Cinzel', serif; }
      `}</style>

      {/* ── 1. HERO ───────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-modern-villa.jpg"
            alt="PM Commercial hero"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/95 via-[#0F172A]/70 to-transparent" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full py-32">
            <div className="max-w-2xl space-y-7">
              {/* Eyebrow */}
              <p
                className="text-[#0F766E] text-[10px] tracking-[0.35em] uppercase font-medium"
              >
                Premium Commercial Real Estate
              </p>

              {/* Headline */}
              <h1
                className="font-cinzel text-white text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
              >
                Spaces That<br />Command Presence
              </h1>

              {/* Body */}
              <p className="text-white/60 text-lg font-light max-w-md leading-relaxed">
                Find and lease premium office and commercial spaces across Nairobi. Flexible workspaces and offices ready for your business.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="/properties"
                  className="cursor-pointer inline-flex items-center justify-center bg-[#0F766E] hover:bg-[#0D9488] text-white px-8 py-4 text-sm tracking-widest uppercase transition-colors duration-200"
                >
                  Browse Available Spaces
                </Link>
                <Link
                  href="/contact"
                  className="cursor-pointer inline-flex items-center justify-center border border-white/30 hover:border-white text-white px-8 py-4 text-sm tracking-widest uppercase transition-colors duration-200"
                >
                  Schedule a Viewing
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip — glassmorphism */}
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-12">
            <div
              className="inline-flex divide-x divide-white/10 border border-white/10"
              style={{
                background: "rgba(15,23,42,0.55)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="px-10 py-5 text-center"
                >
                  <div className="font-cinzel text-white text-2xl font-bold">
                    {s.value}
                  </div>
                  <div className="text-white/50 text-xs tracking-widest uppercase mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. TICKER ─────────────────────────────────────────────────── */}
      <div className="bg-[#0F766E] py-3 overflow-hidden">
        <div className="marquee-track">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="text-white text-xs tracking-[0.2em] uppercase whitespace-nowrap pr-12"
            >
              GRADE A OFFICES&nbsp;&nbsp;·&nbsp;&nbsp;RETAIL PAVILIONS&nbsp;&nbsp;·&nbsp;&nbsp;LOGISTICS HUBS&nbsp;&nbsp;·&nbsp;&nbsp;MIXED-USE DEVELOPMENTS&nbsp;&nbsp;·&nbsp;&nbsp;COMMERCIAL LAND&nbsp;&nbsp;·&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── 3. FEATURED PROPERTIES ────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section header */}
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-cinzel text-[#0F172A] text-3xl sm:text-4xl font-bold">
              Available Offices &amp; Commercial Spaces
            </h2>
            <Link
              href="/properties"
              className="text-[#0F766E] hover:text-[#14B8A6] text-sm tracking-wide flex items-center gap-1 cursor-pointer transition-colors duration-200"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Featured card — spans 2 rows */}
            {featured && (
              <Link
                href={`/properties/${featured.id}`}
                className="relative overflow-hidden md:row-span-2 group cursor-pointer block"
              >
                <div className="relative w-full h-80 md:h-full min-h-[480px]">
                  <Image
                    src={featured.images[0]}
                    alt={featured.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span className="text-[#14B8A6] text-[10px] tracking-[0.25em] uppercase">
                      {featured.type} · {featured.status}
                    </span>
                    <h3 className="font-cinzel text-white text-xl font-bold mt-1 leading-snug">
                      {featured.title}
                    </h3>
                    <p className="text-white/60 text-sm mt-1">{featured.location}</p>
                    <p className="text-white font-semibold mt-2 text-base">
                      {formatPrice(featured.price)}
                    </p>
                  </div>
                </div>
              </Link>
            )}

            {/* Remaining cards */}
            {rest.map((prop) => (
              <Link
                key={prop.id}
                href={`/properties/${prop.id}`}
                className="relative overflow-hidden group cursor-pointer block"
              >
                <div className="relative w-full h-56">
                  <Image
                    src={prop.images[0]}
                    alt={prop.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/85 via-[#0F172A]/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <span className="text-[#14B8A6] text-[9px] tracking-[0.25em] uppercase">
                      {prop.type} · {prop.status}
                    </span>
                    <h3 className="font-cinzel text-white text-sm font-bold mt-1 leading-snug">
                      {prop.title}
                    </h3>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-white/60 text-xs">{prop.location}</p>
                      <p className="text-white font-semibold text-sm">
                        {formatPrice(prop.price)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WHY PM ─────────────────────────────────────────────────── */}
      <section className="bg-[#0F172A] py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="mb-14 max-w-xl">
            <p className="text-[#0F766E] text-[10px] tracking-[0.35em] uppercase mb-4">
              Our Advantage
            </p>
            <h2 className="font-cinzel text-white text-3xl sm:text-4xl font-bold leading-snug">
              Why Industry Leaders<br />Choose PM
            </h2>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyCards.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="p-7 border transition-colors duration-200 hover:border-[#0F766E]/60"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderColor: "rgba(255,255,255,0.10)",
                }}
              >
                <Icon className="text-[#14B8A6] mb-5" size={28} strokeWidth={1.5} />
                <h3 className="font-cinzel text-white text-base font-bold mb-3">
                  {title}
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CTA SECTION ────────────────────────────────────────────── */}
      <section className="bg-[#0F766E] py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="font-cinzel text-white text-3xl sm:text-4xl font-bold leading-snug">
              Ready to Secure Your Next Workspace?
            </h2>
            <p className="text-white/80 text-lg font-light max-w-lg mx-auto leading-relaxed">
              Our leasing advisors are standing by to match you with the ideal
              office or retail space across Nairobi&apos;s prime commercial nodes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Link
                href="/properties"
                className="cursor-pointer inline-flex items-center justify-center bg-white text-[#0F172A] hover:bg-[#F8FAFC] px-8 py-4 text-sm tracking-widest uppercase transition-colors duration-200"
              >
                Explore Available Spaces
              </Link>
              <Link
                href="/contact"
                className="cursor-pointer inline-flex items-center justify-center border border-white text-white hover:bg-white/10 px-8 py-4 text-sm tracking-widest uppercase transition-colors duration-200"
              >
                Talk to a Leasing Advisor
              </Link>
            </div>
          </div>
        </div>
      </section>


    </>
  );
}
