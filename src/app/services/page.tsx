import Link from "next/link";
import {
  Building2,
  Briefcase,
  LineChart,
  Layers,
  ShieldCheck,
  BarChart3,
  ArrowRight,
  Check,
  Phone,
  Clock,
  Globe2
} from "lucide-react";

export const metadata = {
  title: "Commercial Advisory & Institutional Services | Karan Holdings",
  description:
    "Institutional commercial real estate services across East Africa: property acquisitions, corporate tenant leasing, capital markets, and asset stewardship.",
};

interface ServiceItem {
  number: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  description: string;
  scope: string[];
}

const SERVICES: ServiceItem[] = [
  {
    number: "01",
    title: "Commercial Property Acquisition",
    icon: Building2,
    tagline: "Institutional Buyer Advisory & Off-Market Origination",
    description:
      "Full-spectrum buy-side advisory for sovereign funds, REITs, and private capital seeking Grade A commercial office towers, industrial logistics parks, and prime urban development land.",
    scope: [
      "Off-market deal sourcing & proprietary deal flow",
      "Financial stress-testing & cash flow modeling",
      "Zoning, structural, and title deed due diligence",
      "Contract negotiation & escrow settlement",
    ],
  },
  {
    number: "02",
    title: "Corporate Tenant Representation",
    icon: Briefcase,
    tagline: "Strategic Relocation & Lease Optimization",
    description:
      "Bespoke leasing advisory for multinationals, financial institutions, and diplomatic missions negotiating Grade A office footprints across Nairobi and East African hubs.",
    scope: [
      "Workplace density & footprint optimization",
      "Comprehensive multi-building market benchmarking",
      "Lease restructuring, rent-free caps & indexation terms",
      "Tenant fit-out coordination oversight",
    ],
  },
  {
    number: "03",
    title: "Asset & Portfolio Stewardship",
    icon: LineChart,
    tagline: "Yield Maximization & Net Operating Income",
    description:
      "Disciplined asset stewardship designed to maximize Net Operating Income (NOI), reduce structural vacancies, and protect long-term capital preservation for institutional owners.",
    scope: [
      "Proactive lease expiration & covenant risk management",
      "Operating expenditure & facilities rationalization",
      "Capital expenditure planning & facade modernization",
      "Institutional investor reporting & audit documentation",
    ],
  },
  {
    number: "04",
    title: "Capital Markets & Asset Disposition",
    icon: BarChart3,
    tagline: "Structured Divestment & Capital Syndication",
    description:
      "Confidential disposition campaigns connecting property owners with qualified domestic and cross-border institutional capital, private equity sponsors, and pension trusts.",
    scope: [
      "Confidential Information Memorandum (CIM) preparation",
      "Targeted institutional buyer qualification & roadshows",
      "Virtual data room administration & multi-round bidding",
      "Definitive agreement closure & transaction clearing",
    ],
  },
  {
    number: "05",
    title: "Development Feasibility & Master Planning",
    icon: Layers,
    tagline: "Pre-Development Advisory & Highest-and-Best-Use",
    description:
      "Translating raw land parcels and redevelopment sites into bankable institutional commercial hubs, modern logistics yards, and mixed-use precincts.",
    scope: [
      "Highest-and-Best-Use (HBU) quantitative modeling",
      "Micro-market tenant absorption & rent projections",
      "Architectural programming aligned with tenant requirements",
      "Joint-venture structuring & mezzanine debt syndication",
    ],
  },
  {
    number: "06",
    title: "Valuation & Technical Due Diligence",
    icon: ShieldCheck,
    tagline: "Audit-Grade Appraisals & Risk Mitigation",
    description:
      "Independent, audit-ready commercial asset appraisals and technical condition surveys for balance sheet reporting, financing collateral, and acquisition underwriting.",
    scope: [
      "Red Book compliant certified commercial valuations",
      "Structural, HVAC, and fire suppression engineering audits",
      "Historical yields & rental indexation compliance audits",
      "Exit capitalization rate & IRR sensitivity studies",
    ],
  },
];

const METHODOLOGY_STEPS = [
  {
    step: "01",
    title: "Mandate Discovery",
    desc: "Rigorous initial consultation to define investment parameters, yield hurdles, risk boundaries, and governance criteria.",
  },
  {
    step: "02",
    title: "Data Intelligence & Underwriting",
    desc: "Quantitative stress-testing against proprietary micro-market rental yields, vacancy rates, and tenant creditworthiness.",
  },
  {
    step: "03",
    title: "Structured Execution",
    desc: "Direct partner-led negotiation of pricing, legal covenants, lease documents, and title transfers with zero compromises.",
  },
  {
    step: "04",
    title: "Post-Close Stewardship",
    desc: "Seamless handover into asset optimization, tenant covenants management, and recurring institutional performance audits.",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* ── 1. HERO BANNER (Matching Header aesthetic: #0F172A + #14B8A6 + #0F766E) ── */}
      <section className="bg-[#0F172A] pt-24 sm:pt-28 pb-16 sm:pb-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <Globe2 className="w-4 h-4 text-[#14B8A6]" />
              <span className="text-[#14B8A6] text-[10px] tracking-[0.35em] uppercase font-semibold">
                Institutional Commercial Advisory
              </span>
            </div>

            <h1
              className="text-white text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Specialized Solutions for Prime Commercial Assets
            </h1>

            <p className="text-white/60 text-sm sm:text-base font-light mt-4 sm:mt-6 leading-relaxed max-w-2xl">
              We structure, execute, and safeguard Grade A commercial transactions throughout Nairobi and East Africa. Backed by proprietary transaction data, legal rigor, and senior partner oversight.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-semibold tracking-widest uppercase transition-colors rounded-none shadow-sm cursor-pointer"
              >
                <span>Engage Advisory Desk</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 border border-white/20 text-white hover:bg-white/10 text-xs font-semibold tracking-widest uppercase transition-colors rounded-none cursor-pointer"
              >
                <span>Browse Inventory</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. SERVICES GRID (Clean Light Surface with Crisp Borders & Teal Accents) ── */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4 sm:gap-6 border-b border-slate-200 pb-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#0F766E] font-semibold block mb-2">
              Capabilities Roster
            </span>
            <h2
              className="text-2xl sm:text-4xl font-bold text-[#0F172A] tracking-tight"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Core Commercial Disciplines
            </h2>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm font-light max-w-md leading-relaxed">
            Every client engagement is stewarded by senior partners with documented transactional track records across institutional commercial corridors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.number}
                className="bg-white border border-slate-200/90 shadow-sm p-6 sm:p-8 flex flex-col justify-between hover:border-[#0F766E] hover:shadow-md transition-all duration-200 rounded-none group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold text-[#0F766E] tracking-wider">
                      {srv.number}
                    </span>
                    <div className="w-10 h-10 bg-[#0F766E]/10 rounded-none flex items-center justify-center text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white transition-colors duration-200">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3
                    className="text-lg sm:text-xl font-bold text-[#0F172A] mb-2 leading-snug"
                    style={{ fontFamily: "Cinzel, serif" }}
                  >
                    {srv.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#0F766E] uppercase tracking-wider mb-3">
                    {srv.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed mb-6">
                    {srv.description}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-5 mt-auto">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-3">
                    Scope Deliverables:
                  </p>
                  <ul className="space-y-2">
                    {srv.scope.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-slate-700 flex items-start gap-2.5"
                      >
                        <Check className="w-3.5 h-3.5 text-[#0F766E] mt-0.5 shrink-0" />
                        <span className="font-light">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 3. METHODOLOGY ── */}
      <section className="bg-white py-16 sm:py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#0F766E] font-semibold block mb-2">
              The Institutional Standard
            </span>
            <h2
              className="text-2xl sm:text-4xl font-bold text-[#0F172A] mb-3"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Execution Methodology
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
              A transparent, risk-engineered procedure ensuring contractual certainty, speed to close, and valuation protection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {METHODOLOGY_STEPS.map((step) => (
              <div
                key={step.step}
                className="bg-[#F8FAFC] border border-slate-200 p-6 flex flex-col justify-between rounded-none shadow-sm hover:border-[#0F766E]/50 transition-colors"
              >
                <div>
                  <span className="text-2xl sm:text-3xl font-mono text-[#0F766E] font-bold block mb-4">
                    {step.step}
                  </span>
                  <h3
                    className="text-base font-bold text-[#0F172A] mb-2"
                    style={{ fontFamily: "Cinzel, serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. CALL TO ACTION (Matching Footer: #0F172A with border-t-2 #0F766E) ── */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="bg-[#0F172A] border-t-2 border-[#0F766E] p-8 sm:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 rounded-none shadow-xl text-white">
            <div className="max-w-xl">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#14B8A6] font-semibold block mb-2">
                Mandate Origination
              </span>
              <h2
                className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Initiate an Institutional Commercial Advisory Brief
              </h2>
              <p className="text-white/60 text-xs sm:text-sm font-light leading-relaxed">
                Schedule a confidential consultation with our commercial partners to evaluate off-market acquisitions, tenant relocations, or asset divestments.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-semibold tracking-widest uppercase transition-colors rounded-none shadow-sm cursor-pointer"
              >
                <span>Request Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href="tel:+254768096084"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white hover:bg-white/10 text-xs font-semibold tracking-widest uppercase transition-colors rounded-none cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#14B8A6]" />
                <span>+254 768 096 084</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
