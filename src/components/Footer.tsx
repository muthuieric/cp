import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaInstagram, FaXTwitter, FaWhatsapp } from "react-icons/fa6";

const NAV_LINKS = [
  { label: "Properties", href: "/properties" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

const SOCIAL_LINKS = [
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaXTwitter, href: "https://x.com", label: "X / Twitter" },
  { icon: FaWhatsapp, href: "https://wa.me/254768096084", label: "WhatsApp" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] border-t-2 border-[#0F766E]">
      {/* ── Main Grid ── */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">

        {/* Column 1 — Brand (5 cols) */}
        <div className="md:col-span-5 flex flex-col gap-5">
          <Link href="/" className="flex flex-col leading-none cursor-pointer group w-fit">
            <span
              className="text-[#0F766E] font-bold tracking-widest text-2xl group-hover:text-[#14B8A6] transition-colors duration-200"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              KARAN
            </span>
            <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase mt-[-2px]">
              Holdings
            </span>
          </Link>

          <p className="text-white/50 text-sm font-light leading-relaxed max-w-sm">
            Find and lease premium office and commercial spaces across Nairobi. Flexible workspaces and offices ready for your business.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 pt-2">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-white/40 hover:text-[#14B8A6] transition-colors duration-200 cursor-pointer"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2 — Navigate (3 cols) */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h4
            className="text-white text-[11px] tracking-[0.25em] uppercase font-semibold mb-1"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Navigate
          </h4>
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-white/50 hover:text-[#14B8A6] transition-colors duration-200 text-sm font-light cursor-pointer"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Contact & Advisory (4 cols) */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <h4
            className="text-white text-[11px] tracking-[0.25em] uppercase font-semibold mb-1"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Advisory Desk
          </h4>
          <ul className="flex flex-col gap-4">
            <li>
              <a
                href="tel:+254768096084"
                className="flex items-start gap-3 text-white/50 hover:text-[#14B8A6] transition-colors duration-200 cursor-pointer group"
              >
                <Phone
                  size={15}
                  className="mt-0.5 shrink-0 text-[#0F766E] group-hover:text-[#14B8A6] transition-colors duration-200"
                />
                <span className="text-sm font-light">+254 768 096 084</span>
              </a>
            </li>
            <li>
              <a
                href="mailto:info@karanholdings.com"
                className="flex items-start gap-3 text-white/50 hover:text-[#14B8A6] transition-colors duration-200 cursor-pointer group"
              >
                <Mail
                  size={15}
                  className="mt-0.5 shrink-0 text-[#0F766E] group-hover:text-[#14B8A6] transition-colors duration-200"
                />
                <span className="text-sm font-light">info@karanholdings.com</span>
              </a>
            </li>
            <li>
              <div className="flex items-start gap-3 text-white/50">
                <MapPin
                  size={15}
                  className="mt-0.5 shrink-0 text-[#0F766E]"
                />
                <span className="text-sm font-light">Nairobi, Kenya</span>
              </div>
            </li>
          </ul>

          {/* CTA */}
          <Link
            href="/contact"
            className="mt-3 bg-[#0F766E] hover:bg-[#0D9488] text-white text-center py-3 text-[11px] tracking-widest uppercase font-semibold transition-colors duration-200 cursor-pointer w-full block rounded-none"
          >
            Schedule Viewing
          </Link>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs tracking-wide">
            © 2025 Karan Holdings. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-white/30 hover:text-white/60 text-xs tracking-wide transition-colors duration-200 cursor-pointer"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-white/30 hover:text-white/60 text-xs tracking-wide transition-colors duration-200 cursor-pointer"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
