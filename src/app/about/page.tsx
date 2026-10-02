import Image from "next/image";
import Link from "next/link";

interface MetricItem {
  value: string;
  label: string;
}

interface TeamMember {
  name: string;
  title: string;
  bio: string;
  image: string;
  alt: string;
}

interface ValueItem {
  number: string;
  name: string;
  description: string;
}

const metrics: MetricItem[] = [
  { value: "150+", label: "Commercial Spaces" },
  { value: "2.5M+ sq ft", label: "Leased Commercial Area" },
  { value: "12 Years", label: "Market Track Record" },
  { value: "500+", label: "Corporate Tenants" },
];

const team: TeamMember[] = [
  {
    name: "David Mwangi",
    title: "Managing Director",
    bio: "David leads PM Commercial with over 20 years of experience in East African commercial real estate, driving strategy across corporate leasing, flexible workspace solutions, and tenant advisory.",
    image: "https://i.pravatar.cc/500?img=11",
    alt: "David Mwangi, Managing Director",
  },
  {
    name: "Amina Hassan",
    title: "Head of Commercial Leasing",
    bio: "Amina oversees all commercial leasing operations, connecting businesses with prime office footprints and ensuring transparent, flexible lease agreements.",
    image: "https://i.pravatar.cc/500?img=68",
    alt: "Amina Hassan, Head of Commercial Leasing",
  },
  {
    name: "Peter Kamau",
    title: "Head of Tenant Advisory",
    bio: "Peter directs workspace advisory and space planning, helping corporate clients optimize their office layouts and streamline relocation processes.",
    image: "https://i.pravatar.cc/500?img=32",
    alt: "Peter Kamau, Head of Tenant Advisory",
  },
  {
    name: "Sarah Wanjiku",
    title: "Director of Facilities & Operations",
    bio: "Sarah manages day-to-day building operations, tenant amenities, and facilities upkeep across our commercial portfolio, ensuring an optimal working environment for every business.",
    image: "https://i.pravatar.cc/500?img=44",
    alt: "Sarah Wanjiku, Director of Facilities & Operations",
  },
];

const values: ValueItem[] = [
  {
    number: "01",
    name: "Integrity",
    description: "Every lease agreement, viewing, and client advisory engagement is anchored in complete transparency, honest pricing, and ethical conduct.",
  },
  {
    number: "02",
    name: "Excellence",
    description: "We hold ourselves to the highest standards across every discipline, from property curation to tenant fit-out coordination, and never settle for adequate.",
  },
  {
    number: "03",
    name: "Innovation",
    description: "We deploy modern workspace planning and flexible lease models to help businesses scale effortlessly in high-quality commercial environments.",
  },
  {
    number: "04",
    name: "Partnership",
    description: "We succeed only when our tenants succeed. Long-term corporate relationships built on trust and proactive support are the bedrock of everything we do.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#0F172A]">
      {/* ─── 1. HERO ─────────────────────────────────────────────── */}
      <section className="relative h-[60vh] min-h-[440px] pt-16 flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hq-commercial-tower.jpg"
          alt="Modern commercial skyscraper — PM Commercial"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-[#0F172A]/85 backdrop-blur-[2px]" />
        <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-4xl mx-auto">
          <span className="text-[#14B8A6] text-[10px] tracking-[0.35em] uppercase mb-4 font-semibold">Our Story</span>
          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4" style={{ fontFamily: "Cinzel, Georgia, serif" }}>
            Building Kenya&apos;s Commercial Future
          </h1>
          <p className="text-white/60 text-sm sm:text-base font-light max-w-2xl leading-relaxed">
            Find and lease premium office and commercial spaces across Nairobi. Flexible workspaces and offices ready for your business.
          </p>
        </div>
      </section>

      {/* ─── 2. MISSION STRIP ────────────────────────────────────── */}
      <section className="bg-[#0F766E] py-14 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white text-xl lg:text-2xl font-normal italic leading-relaxed" style={{ fontFamily: "Cinzel, Georgia, serif" }}>
            &ldquo;We don&apos;t just lease space, we engineer environments where business scales.&rdquo;
          </p>
        </div>
      </section>

      {/* ─── 3. STORY SECTION ────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-slate-200/90 shadow-md rounded-xl">
                <Image src="/images/hq-commercial-tower.jpg" alt="PM Commercial HQ, Nairobi" fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover object-center" priority />
              </div>
              <p className="text-slate-500 text-xs mt-3 tracking-wide font-medium">PM Commercial HQ, Nairobi</p>
            </div>
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-[#0F766E] text-[10px] tracking-[0.35em] uppercase font-bold mb-3 block">About Us</span>
              <h2 className="text-[#0F172A] text-3xl lg:text-4xl font-bold mb-6 leading-snug tracking-tight" style={{ fontFamily: "Cinzel, Georgia, serif" }}>
                Pioneering Commercial Excellence Since 2012
              </h2>
              <p className="text-slate-600 text-[15px] leading-relaxed mb-4 font-light">
                PM Commercial was founded in Nairobi in 2012 with a singular mission: to provide businesses with exceptional commercial spaces and transparent, professional leasing advisory across East Africa.
              </p>
              <p className="text-slate-600 text-[15px] leading-relaxed mb-4 font-light">
                Over the past twelve years we have grown into a trusted commercial leasing authority spanning prime office suites, flexible corporate workspaces, tenant representation, and dedicated facilities management.
              </p>
              <p className="text-slate-600 text-[15px] leading-relaxed mb-10 font-light">
                We focus exclusively on Grade A and prime commercial locations because the quality of your workspace directly impacts employee productivity, brand prestige, and business growth.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 sm:gap-y-8 border-t border-slate-100 pt-8 sm:pt-10">
                {metrics.map((m) => (
                  <div key={m.label}>
                    <p className="text-[#0F766E] text-3xl lg:text-4xl font-bold mb-1 tracking-tight" style={{ fontFamily: "Cinzel, Georgia, serif" }}>
                      {m.value}
                    </p>
                    <p className="text-slate-500 text-xs tracking-wider uppercase font-medium">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. LEADERSHIP TEAM ──────────────────────────────────── */}
      <section className="bg-[#F8FAFC] py-24 px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#0F766E] text-[10px] tracking-[0.35em] uppercase font-bold block mb-3">The People</span>
            <h2 className="text-[#0F172A] text-3xl lg:text-4xl font-bold tracking-tight" style={{ fontFamily: "Cinzel, Georgia, serif" }}>
              Leadership Team
            </h2>
            <div className="w-16 h-0.5 bg-[#0F766E] mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-white border border-slate-200/90 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center group">
                <div className="relative w-36 h-36 mb-6 overflow-hidden rounded-xl border border-slate-200 shadow-inner bg-slate-100 ring-2 ring-[#0F766E]/20 group-hover:ring-[#0F766E] transition-all">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={member.image} alt={member.alt} className="w-full h-full object-cover object-center" />
                </div>
                <h3 className="text-[#0F172A] text-lg font-bold mb-1 tracking-tight" style={{ fontFamily: "Cinzel, Georgia, serif" }}>
                  {member.name}
                </h3>
                <p className="text-[#0F766E] text-xs font-semibold tracking-wider uppercase mb-3">{member.title}</p>
                <p className="text-slate-600 text-xs font-light leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. CORE VALUES ───────────────────────────────────────── */}
      <section className="bg-[#0F172A] py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#14B8A6] text-[10px] tracking-[0.35em] uppercase font-bold block mb-3">What We Stand For</span>
            <h2 className="text-white text-3xl lg:text-4xl font-bold tracking-tight" style={{ fontFamily: "Cinzel, Georgia, serif" }}>
              Our Core Values
            </h2>
            <div className="w-16 h-0.5 bg-[#0F766E] mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.name} className="bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col gap-4 hover:border-[#0F766E]/50 transition-all duration-300">
                <span className="text-[#14B8A6] text-3xl font-light" style={{ fontFamily: "Cinzel, Georgia, serif" }}>{v.number}</span>
                <h3 className="text-white text-lg font-bold tracking-wide" style={{ fontFamily: "Cinzel, Georgia, serif" }}>{v.name}</h3>
                <p className="text-white/60 text-sm font-light leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-20 text-center">
            <p className="text-white/60 text-sm mb-6 font-light">
              Ready to find the ideal commercial workspace for your business?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/properties" className="inline-block bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs tracking-[0.2em] uppercase font-bold px-8 py-4 transition-all duration-200 rounded-none shadow-md cursor-pointer">
                Browse Available Spaces
              </Link>
              <Link href="/contact" className="inline-block border border-white/20 hover:bg-white/10 text-white text-xs tracking-[0.2em] uppercase font-bold px-8 py-4 transition-all duration-200 rounded-none cursor-pointer">
                Schedule a Viewing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
