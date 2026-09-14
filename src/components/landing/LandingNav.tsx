import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "How it works", href: "/#how" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "Case study", href: "/#case" },
  { label: "FAQ", href: "/#faq" },
];

export default function LandingNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleHashLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      const targetPath = path || "/";
      if (window.location.pathname === targetPath) {
        e.preventDefault();
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.pushState(null, "", href);
        }
      }
    }
  };

  return (
    <div className="fixed top-3 sm:top-4 left-0 right-0 z-50 flex flex-col items-center px-3 sm:px-4 pointer-events-none">
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-[1080px] pointer-events-auto"
      >
        <div className="rounded-full border border-slate-200/90 bg-white/95 sm:bg-white/90 backdrop-blur-xl flex items-center justify-between gap-3 md:gap-4 pl-4 sm:pl-5 md:pl-6 pr-2 sm:pr-2.5 md:pr-3 py-1.5 sm:py-2 md:py-2.5 min-h-[48px] md:min-h-[60px] shadow-[0_8px_30px_-10px_rgba(15,23,42,0.12)]">
          {/* Brand Logo & Name */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="Curezy home">
            <img src="/curezy logo.png" alt="Curezy" className="h-7 sm:h-8 md:h-9 w-auto object-contain shrink-0" />
            <span className="font-display font-bold tracking-tight text-[15px] sm:text-base md:text-[17px] text-slate-900">
              Curezy
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center justify-center gap-1">
            {links.map((l) =>
              l.href.startsWith("/") && !l.href.includes("#") ? (
                <Link
                  key={l.href}
                  to={l.href}
                  className="px-3.5 md:px-4 py-2 text-[13px] md:text-sm font-medium text-slate-600 hover:text-slate-900 rounded-full transition-colors whitespace-nowrap"
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleHashLink(e, l.href)}
                  className="px-3.5 md:px-4 py-2 text-[13px] md:text-sm font-medium text-slate-600 hover:text-slate-900 rounded-full transition-colors whitespace-nowrap"
                >
                  {l.label}
                </a>
              )
            )}
          </nav>

          {/* Action Buttons & Mobile Hamburger */}
          <div className="flex items-center gap-2 md:gap-2.5 shrink-0">
            <a
              href="/#contact"
              onClick={(e) => handleHashLink(e, "/#contact")}
              className="hidden sm:inline-block text-[13px] md:text-sm font-semibold text-slate-700 hover:text-slate-900 px-3.5 md:px-4 py-2 rounded-full hover:bg-slate-100 transition-colors whitespace-nowrap"
            >
              Contact us
            </a>

            <a
              href="/#contact"
              onClick={(e) => handleHashLink(e, "/#contact")}
              className="btn-white-pill !py-1.5 sm:!py-2 md:!py-2.5 !px-3.5 sm:!px-4 md:!px-6 !text-xs sm:!text-[13px] md:!text-sm !font-semibold whitespace-nowrap shrink-0 shadow-sm"
            >
              Book a demo
            </a>

            {/* Mobile menu toggle icon */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-8 h-8 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="mt-2 p-3.5 rounded-2xl bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-2xl md:hidden space-y-1"
            >
              {links.map((l) =>
                l.href.startsWith("/") && !l.href.includes("#") ? (
                  <Link
                    key={l.href}
                    to={l.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-cyan-700 hover:bg-cyan-50/60 transition-colors"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => handleHashLink(e, l.href)}
                    className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-cyan-700 hover:bg-cyan-50/60 transition-colors"
                  >
                    {l.label}
                  </a>
                )
              )}
              <div className="pt-2 border-t border-slate-100">
                <a
                  href="/#contact"
                  onClick={(e) => handleHashLink(e, "/#contact")}
                  className="block w-full text-center py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Contact Us Form
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}
