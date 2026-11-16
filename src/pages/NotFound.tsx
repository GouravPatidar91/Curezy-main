import React, { useState, useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowLeft,
  Home,
  Sparkles,
  PhoneCall,
  MessageSquare,
  Activity,
  FileText,
  ShieldCheck,
  Download,
  Stethoscope,
  Layers,
  ArrowRight,
  HelpCircle,
  X,
} from "lucide-react";
import CosmicFrame from "@/components/landing/CosmicFrame";
import LandingNav from "@/components/landing/LandingNav";
import LandingFooter from "@/components/landing/LandingFooter";
import SEO from "@/components/common/SEO";

interface SiteLink {
  title: string;
  description: string;
  href: string;
  category: "Platform" | "Solutions" | "Providers" | "Legal";
  icon: React.ElementType;
  badge?: string;
}

const allLinks: SiteLink[] = [
  // Platform
  {
    title: "Homepage",
    description: "AI Care Operating System for clinics, patient engagement & automation.",
    href: "/",
    category: "Platform",
    icon: Home,
  },
  {
    title: "Pricing & Plans",
    description: "Transparent pricing for WhatsApp automation, voice receptionists & provider seats.",
    href: "/pricing",
    category: "Platform",
    icon: Sparkles,
    badge: "Popular",
  },
  {
    title: "About Us",
    description: "Our mission to empower clinics with autonomous AI healthcare operations.",
    href: "/about-us",
    category: "Platform",
    icon: Activity,
  },
  {
    title: "Download Android App",
    description: "Curezy patient companion app with doctor consultations & AI triage.",
    href: "/download",
    category: "Platform",
    icon: Download,
    badge: "Free",
  },

  // Solutions
  {
    title: "WhatsApp Care Automation",
    description: "Automate appointment reminders, adherence tracking and clinical triage on WhatsApp.",
    href: "/#solutions",
    category: "Solutions",
    icon: MessageSquare,
  },
  {
    title: "AI Voice Agents",
    description: "Autonomous phone receptionists that reschedule missed appointments & follow up.",
    href: "/#solutions",
    category: "Solutions",
    icon: PhoneCall,
  },
  {
    title: "AI Medical Imaging",
    description: "Automated CT/X-ray segmentation and diagnostic assistance workflows.",
    href: "/#solutions",
    category: "Solutions",
    icon: Activity,
  },
  {
    title: "EMR Integrations",
    description: "Seamless bi-directional sync with existing hospital & clinic software.",
    href: "/#solutions",
    category: "Solutions",
    icon: Layers,
  },
  {
    title: "Clinic Case Studies",
    description: "Real-world operational results, recovered revenues, and clinic metrics.",
    href: "/#case",
    category: "Solutions",
    icon: HelpCircle,
  },

  // Providers & Partners
  {
    title: "Book a Clinic Demo",
    description: "Schedule a live tailored walkthrough for your hospital or private practice.",
    href: "/#contact",
    category: "Providers",
    icon: PhoneCall,
    badge: "Live",
  },
  {
    title: "Doctor Registration",
    description: "Join Curezy's verified clinical provider and tele-consultation network.",
    href: "/doctor-registration",
    category: "Providers",
    icon: Stethoscope,
  },
  {
    title: "Delivery Partner Onboarding",
    description: "Partner with Curezy for fast local medicine and healthcare deliveries.",
    href: "/delivery-partner-registration",
    category: "Providers",
    icon: Layers,
  },

  // Legal
  {
    title: "Privacy Policy",
    description: "DPDP & HIPAA-aligned health data protection and privacy practices.",
    href: "/privacy-policy",
    category: "Legal",
    icon: ShieldCheck,
  },
  {
    title: "Terms of Service",
    description: "Comprehensive terms of use for Curezy software, apps, and clinical tools.",
    href: "/terms-of-service",
    category: "Legal",
    icon: FileText,
  },
  {
    title: "Refund Policy",
    description: "Clear guidelines on cancellations, refunds, and service subscriptions.",
    href: "/refund-policy",
    category: "Legal",
    icon: FileText,
  },
  {
    title: "Shipping Policy",
    description: "Delivery timelines, city rollouts, and healthcare package logistics.",
    href: "/shipping-policy",
    category: "Legal",
    icon: FileText,
  },
];

const popularQueries = [
  "Pricing",
  "WhatsApp",
  "Voice Agent",
  "About",
  "Download App",
  "Demo",
  "Privacy",
];

const NotFound = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.warn(`404 Encountered: Path not found -> ${location.pathname}`);
  }, [location.pathname]);

  const filteredLinks = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return allLinks;
    return allLinks.filter(
      (link) =>
        link.title.toLowerCase().includes(q) ||
        link.description.toLowerCase().includes(q) ||
        link.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const groupedLinks = useMemo(() => {
    const groups: Record<string, SiteLink[]> = {
      Platform: [],
      Solutions: [],
      Providers: [],
      Legal: [],
    };
    filteredLinks.forEach((link) => {
      if (groups[link.category]) {
        groups[link.category].push(link);
      }
    });
    return groups;
  }, [filteredLinks]);

  return (
    <CosmicFrame>
      <SEO
        title="404 — Page Not Found | Curezy"
        description="The page you were looking for doesn't exist or has moved. Explore Curezy AI Care OS, pricing plans, solutions, and downloads."
        canonical="https://www.curezy.in/404"
      />
      <LandingNav />

      <main className="relative pt-36 pb-28 md:pt-44 md:pb-36 overflow-hidden">
        <div className="container relative max-w-6xl mx-auto px-4 sm:px-6">
          {/* Hero Section */}
          <div className="max-w-3xl mx-auto text-center mb-14 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 text-[11px] font-semibold px-3.5 py-1.5 mb-6 shadow-[0_0_20px_-3px_rgba(6,182,212,0.3)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              Error 404 · Route Not Found
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-display text-slate-900 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.035em] leading-[1.05]"
            >
              Looking for care in the{" "}
              <span className="bg-gradient-to-r from-cyan-600 via-[#2563ff] to-blue-700 bg-clip-text text-transparent">
                wrong coordinates?
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
            >
              The page <code className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-sm font-mono border border-slate-200">{location.pathname}</code> does not exist or may have shifted. Search below or jump directly to any active section of Curezy.
            </motion.p>

            {/* Live Search Box */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 max-w-xl mx-auto"
            >
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#2563ff] transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search pages, solutions, pricing, or policies..."
                  className="w-full pl-12 pr-10 py-3.5 sm:py-4 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-sm sm:text-base shadow-[0_8px_30px_-10px_rgba(15,23,42,0.08)] focus:outline-none focus:ring-2 focus:ring-[#2563ff]/20 focus:border-[#2563ff] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Quick Filter Tags */}
              <div className="mt-3.5 flex flex-wrap items-center justify-center gap-1.5 text-xs">
                <span className="text-slate-400 mr-1">Suggestions:</span>
                {popularQueries.map((query) => (
                  <button
                    key={query}
                    onClick={() => setSearchQuery(query)}
                    className={`px-2.5 py-1 rounded-full border text-xs font-medium transition-colors ${
                      searchQuery.toLowerCase() === query.toLowerCase()
                        ? "bg-[#2563ff] text-white border-[#2563ff]"
                        : "bg-slate-50 border-slate-200/80 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {query}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <Link
                to="/"
                className="btn-white-pill !text-white text-sm font-semibold !px-6 !py-3 shadow-md hover:shadow-lg transition-all duration-200 group inline-flex items-center gap-2"
                style={{ color: "#ffffff" }}
              >
                <ArrowLeft
                  className="w-4 h-4 !text-white transition-transform group-hover:-translate-x-1"
                  style={{ color: "#ffffff", stroke: "#ffffff" }}
                />
                <span className="!text-white font-semibold" style={{ color: "#ffffff" }}>
                  Return to Homepage
                </span>
              </Link>
              <Link
                to="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold transition-all duration-200"
              >
                <PhoneCall className="w-4 h-4 text-[#2563ff]" />
                Book Live Clinic Demo
              </Link>
            </motion.div>
          </div>

          {/* Directory of Valid Pages */}
          <div className="mt-12 space-y-12">
            {filteredLinks.length === 0 ? (
              <div className="text-center py-16 px-4 rounded-3xl bg-slate-50 border border-slate-200/80">
                <p className="text-slate-500 text-base">
                  No matching pages found for "<span className="font-semibold text-slate-800">{searchQuery}</span>".
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563ff] hover:underline"
                >
                  Clear search and view all directory links <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              (Object.keys(groupedLinks) as Array<keyof typeof groupedLinks>).map((category) => {
                const links = groupedLinks[category];
                if (!links || links.length === 0) return null;

                return (
                  <div key={category} className="space-y-4">
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400">
                        {category}
                      </h2>
                      <div className="h-px flex-1 bg-slate-200/80" />
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {links.map((link) => {
                        const Icon = link.icon;
                        const isExternalOrHash = link.href.includes("#");

                        const CardContent = (
                          <div className="h-full p-5 rounded-2xl border border-slate-200/90 bg-white hover:border-[#2563ff]/40 hover:shadow-[0_10px_30px_-10px_rgba(37,99,255,0.12)] transition-all duration-200 flex flex-col justify-between group">
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-[#2563ff]/10 group-hover:text-[#2563ff] transition-colors">
                                  <Icon className="w-4 h-4" />
                                </div>
                                {link.badge && (
                                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-50 border border-cyan-200/60 text-cyan-700">
                                    {link.badge}
                                  </span>
                                )}
                              </div>
                              <h3 className="font-display font-semibold text-slate-900 text-sm group-hover:text-[#2563ff] transition-colors flex items-center gap-1">
                                {link.title}
                                <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#2563ff]" />
                              </h3>
                              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                                {link.description}
                              </p>
                            </div>
                            <div className="mt-4 text-[11px] font-medium text-slate-400 group-hover:text-[#2563ff] transition-colors">
                              {link.href}
                            </div>
                          </div>
                        );

                        return isExternalOrHash ? (
                          <a
                            key={link.title}
                            href={link.href}
                            className="block h-full cursor-pointer focus:outline-none"
                          >
                            {CardContent}
                          </a>
                        ) : (
                          <Link
                            key={link.title}
                            to={link.href}
                            className="block h-full cursor-pointer focus:outline-none"
                          >
                            {CardContent}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>

      <LandingFooter />
    </CosmicFrame>
  );
};

export default NotFound;
