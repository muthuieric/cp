"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu, X, Phone } from "lucide-react";
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

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0F172A] border-b border-white/5">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        {/* ── Logo ── */}
        <Link href="/" className="flex flex-col leading-none cursor-pointer group">
          <span
            className="text-[#0F766E] font-bold tracking-widest text-xl group-hover:text-[#14B8A6] transition-colors duration-200"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            KARAN
          </span>
          <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase mt-[-2px]">
            Holdings
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "text-[12px] tracking-[0.15em] uppercase font-medium transition-colors duration-200 cursor-pointer",
                  active
                    ? "text-[#14B8A6]"
                    : "text-white/70 hover:text-white",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* ── Desktop Right ── */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+254768096084"
            className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors duration-200 cursor-pointer"
            aria-label="Call us"
          >
            <Phone size={14} />
            <span className="text-[11px] tracking-[0.1em]">+254 768 096 084</span>
          </a>

          <Link
            href="/contact"
            className="bg-[#0F766E] hover:bg-[#0D9488] text-white px-5 py-2 text-[11px] tracking-widest uppercase font-semibold transition-colors duration-200 cursor-pointer"
          >
            Schedule Viewing
          </Link>
        </div>

        {/* ── Mobile Trigger ── */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              className="md:hidden text-white/70 hover:text-white transition-colors duration-200 cursor-pointer p-1"
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="bg-[#0F172A] border-l border-white/10 w-[300px] p-0"
          >
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

            {/* Mobile Header */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
              <Link
                href="/"
                className="flex flex-col leading-none cursor-pointer"
                onClick={() => setMobileOpen(false)}
              >
                <span
                  className="text-[#0F766E] font-bold tracking-widest text-xl"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  KARAN
                </span>
                <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase mt-[-2px]">
                  Holdings
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-white/50 hover:text-white transition-colors duration-200 cursor-pointer p-1"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col px-6 py-8 gap-1">
              {NAV_LINKS.map(({ label, href }) => {
                const active = pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link
                    key={href}
                    href={href}
                    className={[
                      "text-[13px] tracking-[0.2em] uppercase font-medium py-3 border-b border-white/5 transition-colors duration-200 cursor-pointer",
                      active
                        ? "text-[#14B8A6]"
                        : "text-white/70 hover:text-white",
                    ].join(" ")}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile CTA */}
            <div className="px-6 pb-8 flex flex-col gap-4">
              <Link
                href="/contact"
                className="bg-[#0F766E] hover:bg-[#0D9488] text-white text-center py-3 text-[11px] tracking-widest uppercase font-semibold transition-colors duration-200 cursor-pointer"
              >
                Schedule Viewing
              </Link>

              <a
                href="tel:+254768096084"
                className="flex items-center justify-center gap-2 text-white/50 hover:text-white transition-colors duration-200 cursor-pointer py-2"
              >
                <Phone size={14} />
                <span className="text-[12px] tracking-[0.1em]">+254 768 096 084</span>
              </a>

              {/* Social Icons */}
              <div className="flex items-center justify-center gap-5 pt-4 border-t border-white/10">
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
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
