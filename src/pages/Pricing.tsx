import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Check,
  Minus,
  Sparkles,
  PhoneCall,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  User,
  Mail,
  Phone,
  Building2,
  HelpCircle,
  MessageSquare,
  Send,
  X,
  CheckCircle2,
  Shield,
} from "lucide-react";
import CosmicFrame from "@/components/landing/CosmicFrame";
import LandingNav from "@/components/landing/LandingNav";
import LandingFooter from "@/components/landing/LandingFooter";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Market = "IN" | "US";

interface Plan {
  id: string;
  name: string;
  badge?: string;
  isPopular?: boolean;
  isCustom?: boolean;
  price: { IN: number; US: number };
  period: string;
  target: { IN: string; US: string };
  providers: string;
  voiceMinutes: string;
  features: string[];
  ctaText: string;
  defaultPrompt: string;
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    badge: "Free Forever",
    price: { IN: 0, US: 0 },
    period: "/month",
    target: {
      IN: "Experience AI voice reception at zero cost",
      US: "Solo providers exploring AI reception",
    },
    providers: "1 doctor",
    voiceMinutes: "30 min/mo",
    features: [
      "30 AI voice minutes/month",
      "1 clinic location",
      "Inbound patient call handling",
      "Automated appointment booking",
      "Basic clinic FAQ answering",
      "Zero setup fee · No card required",
    ],
    ctaText: "Start Free",
    defaultPrompt:
      "Hi Curezy team, I would like to activate the Free AI Receptionist tier (30 voice mins/mo) for my clinic. Please send me setup instructions.",
  },
  {
    id: "starter",
    name: "Starter",
    badge: "⭐ Most Popular",
    isPopular: true,
    price: { IN: 999, US: 39 },
    period: "/month",
    target: {
      IN: "Ideal for solo practicing doctors",
      US: "Solo practitioners & private clinics",
    },
    providers: "1 doctor",
    voiceMinutes: "100 min/mo",
    features: [
      "100 AI voice minutes/month",
      "Full WhatsApp AI Assistant",
      "Appointment reminders & rescheduling",
      "Basic patient follow-up automation",
      "Call history & speech transcription",
      "Standard email & chat support",
    ],
    ctaText: "Choose Starter",
    defaultPrompt:
      "Hi Curezy team, I would like to purchase the Starter plan for my clinic. Please contact me with onboarding and setup details.",
  },
  {
    id: "growth",
    name: "Growth",
    badge: "Fastest Growing",
    price: { IN: 1999, US: 79 },
    period: "/month",
    target: {
      IN: "For polyclinics & busy practices",
      US: "For growing clinical practices",
    },
    providers: "1–2 doctors",
    voiceMinutes: "250 min/mo",
    features: [
      "250 AI voice minutes/month",
      "1–2 doctor schedules",
      "Call recording & audio archives",
      "AI call summaries & insights",
      "Patient reactivation campaigns",
      "Basic AI Health Twin profiles",
    ],
    ctaText: "Choose Growth",
    defaultPrompt:
      "Hi Curezy team, I would like to purchase the Growth plan for our polyclinic. Please share the next steps to get started.",
  },
  {
    id: "ai-care",
    name: "AI Care",
    badge: "Flagship",
    price: { IN: 3999, US: 149 },
    period: "/month",
    target: {
      IN: "Full AI healthcare operations suite",
      US: "Complete clinical operations automation",
    },
    providers: "2 doctors",
    voiceMinutes: "500 min/mo",
    features: [
      "500 AI voice minutes/month",
      "Inbound + Outbound AI Receptionist",
      "Longitudinal AI Health Twin context",
      "Full conversational WhatsApp automation",
      "Comprehensive provider analytics",
      "Priority customer onboarding & SLA",
    ],
    ctaText: "Choose AI Care",
    defaultPrompt:
      "Hi Curezy team, I would like to purchase the AI Care plan for our center. Please reach out with implementation details.",
  },
  {
    id: "pro",
    name: "Pro",
    badge: "Multi-Doctor",
    price: { IN: 6999, US: 299 },
    period: "/month",
    target: {
      IN: "Multi-doctor clinics & nursing centers",
      US: "Multi-provider group practices",
    },
    providers: "Up to 5 doctors",
    voiceMinutes: "1,500 min/mo",
    features: [
      "1,500 AI voice minutes/month",
      "Up to 5 doctor schedules supported",
      "EMR / EHR API integrations & webhooks",
      "Custom multi-clinic workflow rules",
      "High-concurrency call handling",
      "Dedicated account manager",
    ],
    ctaText: "Choose Pro",
    defaultPrompt:
      "Hi Curezy team, we are interested in the Pro plan for our multi-doctor clinic. Please contact us to discuss scheduling and EMR sync.",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    badge: "Custom Scale",
    isCustom: true,
    price: { IN: 0, US: 0 },
    period: "",
    target: {
      IN: "Hospitals & healthcare chains",
      US: "Hospital networks & DSOs",
    },
    providers: "Unlimited",
    voiceMinutes: "Custom",
    features: [
      "Custom AI voice persona & fine-tuning",
      "Unlimited branches & provider seats",
      "Dedicated telephony infrastructure",
      "Bi-directional EHR/HIS system sync",
      "HIPAA & DPDP Act compliance support",
      "Custom 99.9% uptime SLA guarantee",
    ],
    ctaText: "Contact Enterprise",
    defaultPrompt:
      "Hi Curezy team, we would like to discuss Enterprise licensing, custom AI voice personas, and hospital EMR integration.",
  },
];

// Simple, clean feature comparison table rows
const simpleComparisonRows = [
  {
    feature: "Doctors / Providers",
    free: "1",
    starter: "1",
    growth: "1–2",
    aicare: "2",
    pro: "Up to 5",
    enterprise: "Unlimited",
  },
  {
    feature: "AI Voice Minutes / mo",
    free: "30 min",
    starter: "100 min",
    growth: "250 min",
    aicare: "500 min",
    pro: "1,500 min",
    enterprise: "Custom",
  },
  {
    feature: "AI Receptionist (Inbound)",
    free: "Lite",
    starter: "Standard",
    growth: "Standard",
    aicare: "Advanced",
    pro: "Advanced",
    enterprise: "Custom Persona",
  },
  {
    feature: "WhatsApp AI Assistant",
    free: "Limited",
    starter: true,
    growth: true,
    aicare: true,
    pro: true,
    enterprise: true,
  },
  {
    feature: "Appointment Automation",
    free: true,
    starter: true,
    growth: true,
    aicare: true,
    pro: true,
    enterprise: true,
  },
  {
    feature: "Patient Follow-ups & Reminders",
    free: false,
    starter: "Basic",
    growth: true,
    aicare: true,
    pro: true,
    enterprise: true,
  },
  {
    feature: "Call Recording & Summaries",
    free: false,
    starter: false,
    growth: true,
    aicare: true,
    pro: true,
    enterprise: true,
  },
  {
    feature: "AI Health Twin Context",
    free: false,
    starter: false,
    growth: "Basic",
    aicare: "Advanced",
    pro: "Advanced",
    enterprise: "Custom",
  },
  {
    feature: "EMR / EHR API Integration",
    free: false,
    starter: false,
    growth: false,
    aicare: false,
    pro: true,
    enterprise: true,
  },
  {
    feature: "Support Tier",
    free: "Community",
    starter: "Standard",
    growth: "Standard",
    aicare: "Priority",
    pro: "Priority",
    enterprise: "Dedicated SLA",
  },
];

const faqs = [
  {
    q: "How does the Free plan work?",
    a: "The Free plan gives your clinic 30 AI voice minutes every single month at zero charge. No credit card is required. Your patients can call your dedicated AI receptionist, ask questions, and book appointments seamlessly.",
  },
  {
    q: "Can I upgrade or downgrade anytime?",
    a: "Yes. You can switch between plans or adjust your provider count at any point. Upgrades take effect immediately, and your usage is billed transparently.",
  },
  {
    q: "What happens if we run out of voice minutes?",
    a: "Calls will never be abruptly disconnected. Additional minutes are billed transparently at low standard rates (starting at ₹5.50–₹8/min in India or $0.08–$0.15/min in the US). You can also set a hard monthly cap from your dashboard.",
  },
  {
    q: "Does WhatsApp automation require our own phone number?",
    a: "Curezy sets up and verifies your clinic's WhatsApp business integration directly. We handle verification so you can begin engaging patients immediately without technical headaches.",
  },
  {
    q: "Is patient healthcare data secure and compliant?",
    a: "Yes, completely. Curezy uses end-to-end encryption, strict role-based access control, and full compliance with the Indian DPDP Act and US HIPAA regulations.",
  },
];

export default function Pricing() {
  const [market, setMarket] = useState<Market>("IN");
  const [isYearly, setIsYearly] = useState(false);

  // Carousel API state
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Plan Purchase Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  // Modal Form Fields
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formOrg, setFormOrg] = useState("");
  const [formPlanName, setFormPlanName] = useState("");
  const [formDoctors, setFormDoctors] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Auto-detect country on mount
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      if (
        tz.includes("Kolkata") ||
        tz.includes("Calcutta") ||
        tz.includes("Delhi") ||
        tz === "Asia/Colombo"
      ) {
        setMarket("IN");
        return;
      }
      if (
        tz.startsWith("America/") ||
        tz.startsWith("US/") ||
        tz.includes("Honolulu")
      ) {
        setMarket("US");
        return;
      }
      fetch("https://api.country.is/")
        .then((res) => res.json())
        .then((data) => {
          if (data?.country === "US") setMarket("US");
          else if (data?.country === "IN") setMarket("IN");
        })
        .catch(() => {});
    } catch {
      setMarket("IN");
    }
  }, []);

  // Sync Carousel API events
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);
  const scrollTo = useCallback((idx: number) => api?.scrollTo(idx), [api]);

  const getPriceDisplay = (plan: Plan) => {
    if (plan.isCustom) return "Custom";
    const monthly = plan.price[market];
    if (monthly === 0) return market === "IN" ? "₹0" : "$0";
    const effective = isYearly ? Math.round(monthly * 0.85) : monthly;
    return market === "IN"
      ? `₹${effective.toLocaleString("en-IN")}`
      : `$${effective}`;
  };

  // Open the interactive purchase/inquiry modal with pre-filled plan details
  const handleOpenPlanModal = (plan: Plan) => {
    setSelectedPlan(plan);
    setFormPlanName(`${plan.name} Plan`);
    setFormDoctors(plan.providers);
    setFormMessage(plan.defaultPrompt);
    setIsSubmitted(false);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formName.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!formEmail.trim() || !formEmail.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!formPhone.trim() || formPhone.replace(/\D/g, "").length < 8) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Insert into Supabase database
      const { error: dbError } = await supabase
        .from("contact_submissions")
        .insert([
          {
            name: formName.trim(),
            email: formEmail.trim().toLowerCase(),
            phone: formPhone.trim(),
            organization: formOrg.trim() || null,
            role: formPlanName,
            service_interest: `${formPlanName} (${market} - ${
              isYearly ? "Yearly (15% off)" : "Monthly"
            })`,
            message: `${formMessage.trim()} [Doctors/Scale: ${formDoctors}]`,
          },
        ]);

      if (dbError) {
        console.warn("Supabase insert warning:", dbError);
      }

      // 2. Dispatch email notification to contact@curezy.in
      try {
        await fetch("https://formsubmit.co/ajax/contact@curezy.in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            _subject: `New Plan Order/Inquiry: ${formName} - ${formPlanName}`,
            _template: "table",
            "Plan Selected": formPlanName,
            "Billing Cycle": isYearly ? "Yearly (15% off)" : "Monthly",
            "Market / Region":
              market === "IN"
                ? "India (₹ INR)"
                : "United States / Global ($ USD)",
            "Price Display": selectedPlan
              ? `${getPriceDisplay(selectedPlan)}/mo`
              : "N/A",
            "Doctors / Scale": formDoctors,
            "Customer Name": formName.trim(),
            "Email Address": formEmail.trim(),
            "Phone Number": formPhone.trim(),
            "Clinic / Organization": formOrg.trim() || "Not specified",
            "Requirements / Notes": formMessage.trim(),
            Timestamp:
              new Date().toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
              }) + " IST",
          }),
        });
      } catch (emailErr) {
        console.warn("Email alert error:", emailErr);
      }

      setIsSubmitted(true);
      toast.success(
        "Thank you! Your request has been received. Our team will contact you shortly."
      );
    } catch (err: any) {
      console.error("Submission failed:", err);
      toast.error(
        err?.message ||
          "Failed to submit. Please try again or email contact@curezy.in directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CosmicFrame>
      <LandingNav />

      <main className="pt-28 md:pt-36 pb-20">
        {/* Header Hero */}
        <div className="container px-4 max-w-4xl mx-auto text-center mb-12">
          <div className="eyebrow mb-4">Transparent Pricing</div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-white leading-[1.08]"
          >
            Predictable plans for{" "}
            <span className="text-white/40">modern healthcare.</span>
          </motion.h1>

          <p className="mt-4 text-base sm:text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
            Choose the right tier for your clinic or hospital practice. Start
            completely free with 30 AI minutes each month.
          </p>

          {/* Clean Controls: Market Toggle & Annual Toggle */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {/* Currency Selector */}
            <div className="inline-flex items-center gap-1.5 p-1 rounded-full glass-dark-card border border-white/10 shadow-sm">
              <button
                type="button"
                onClick={() => setMarket("IN")}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  market === "IN"
                    ? "btn-white-pill !py-1.5 !px-3 shadow-sm"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <span>🇮🇳</span> ₹ INR
              </button>
              <button
                type="button"
                onClick={() => setMarket("US")}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  market === "US"
                    ? "btn-white-pill !py-1.5 !px-3 shadow-sm"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <span>🇺🇸</span> $ USD
              </button>
            </div>

            {/* Monthly / Annual Billing Toggle */}
            <div className="inline-flex items-center gap-2 p-1 rounded-full glass-dark-card border border-white/10">
              <button
                type="button"
                onClick={() => setIsYearly(false)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  !isYearly
                    ? "btn-white-pill !py-1.5 !px-3"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setIsYearly(true)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isYearly
                    ? "btn-white-pill !py-1.5 !px-3"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Yearly
                <span className="text-[10px] uppercase font-bold text-cyan-500 bg-cyan-500/10 px-1.5 py-0.5 rounded-full border border-cyan-500/20">
                  Save 15%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* PRICING CARDS CAROUSEL SECTION */}
        <div className="container px-4 max-w-7xl mx-auto mb-20">
          {/* Carousel Header & Navigation Controls */}
          <div className="flex items-center justify-between mb-6 px-2">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-semibold text-white/50">
                Explore Plans
              </span>
              <span className="text-xs text-cyan-600 font-medium bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                {plans.length} Tiers
              </span>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                aria-label="Previous plan"
                className="w-9 h-9 rounded-full glass-dark-card border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-cyan-400/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                disabled={!canScrollNext}
                aria-label="Next plan"
                className="w-9 h-9 rounded-full glass-dark-card border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-cyan-400/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Embla Carousel */}
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {plans.map((plan) => {
                const isPopular = plan.isPopular;
                return (
                  <CarouselItem
                    key={plan.id}
                    className="pl-4 basis-[92%] sm:basis-[50%] md:basis-[33.333%] lg:basis-[33.333%] xl:basis-[33.333%]"
                  >
                    <div
                      className={`h-full flex flex-col justify-between rounded-[28px] p-6 sm:p-7 relative transition-all overflow-hidden ${
                        isPopular
                          ? "glass-dark-card border-2 border-cyan-400 shadow-[0_20px_50px_-20px_rgba(6,182,212,0.4)]"
                          : "glass-dark-card border border-white/10 hover:border-white/20 shadow-sm"
                      }`}
                    >
                      {/* Top Popular Glow */}
                      {isPopular && (
                        <div
                          className="pointer-events-none absolute -inset-px rounded-[28px]"
                          style={{
                            background:
                              "radial-gradient(120% 50% at 50% 0%, rgba(6,182,212,0.18), transparent 70%)",
                          }}
                        />
                      )}

                      <div className="relative z-10">
                        {/* Plan Header */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <h3 className="font-display text-2xl font-bold text-white">
                            {plan.name}
                          </h3>
                          {plan.badge && (
                            <span
                              className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                                isPopular
                                  ? "bg-gradient-to-r from-cyan-500 to-sky-500 text-white shadow-sm"
                                  : "bg-white/10 text-white/75 border border-white/10"
                              }`}
                            >
                              {plan.badge}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-white/50 min-h-[32px] leading-relaxed mb-5">
                          {plan.target[market]}
                        </p>

                        {/* Price Display */}
                        <div className="mb-5 pb-5 border-b border-white/[0.08]">
                          <div className="flex items-baseline gap-1">
                            <span className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
                              {getPriceDisplay(plan)}
                            </span>
                            {plan.period && (
                              <span className="text-xs font-medium text-white/40">
                                {plan.period}
                              </span>
                            )}
                          </div>
                          <div className="mt-2 flex items-center gap-2 text-xs text-cyan-600 font-semibold">
                            <PhoneCall className="w-3.5 h-3.5" />
                            <span>{plan.voiceMinutes}</span>
                            <span className="text-white/30">·</span>
                            <span className="text-white/60 font-normal">
                              {plan.providers}
                            </span>
                          </div>
                        </div>

                        {/* Minimal Features List */}
                        <div className="space-y-2.5 mb-6">
                          <div className="text-[11px] uppercase tracking-wider font-semibold text-white/40">
                            Key features:
                          </div>
                          {plan.features.map((feat, fIdx) => (
                            <div
                              key={fIdx}
                              className="flex items-start gap-2 text-xs text-white/75 leading-snug"
                            >
                              <Check className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="relative z-10 pt-4 mt-auto border-t border-white/[0.08]">
                        <button
                          type="button"
                          onClick={() => handleOpenPlanModal(plan)}
                          className={`w-full justify-center !text-sm !py-3 cursor-pointer ${
                            isPopular
                              ? "btn-white-pill shadow-md shadow-cyan-500/25"
                              : "btn-glass-pill hover:!border-cyan-400/60"
                          }`}
                        >
                          {plan.ctaText}
                        </button>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>

          {/* Carousel Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {plans.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => scrollTo(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === idx
                    ? "w-7 bg-cyan-500 shadow-sm shadow-cyan-500/50"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* SIMPLE, CLEAN COMPARISON TABLE */}
        <div className="container px-4 max-w-6xl mx-auto mb-24">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="eyebrow mb-2">Compare Features</div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              Feature <span className="text-white/40">breakdown.</span>
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Clean side-by-side comparison across all tiers.
            </p>
          </div>

          <div className="glass-dark-card rounded-[28px] p-4 sm:p-6 overflow-x-auto shadow-sm border border-white/10">
            <table className="w-full text-left text-sm min-w-[700px]">
              <thead>
                <tr className="border-b border-white/10 text-xs font-semibold uppercase tracking-wider text-white/50">
                  <th className="py-3 px-3">Plan</th>
                  <th className="py-3 px-2 text-center">Free</th>
                  <th className="py-3 px-2 text-center text-cyan-600 font-bold bg-cyan-500/5 rounded-t-lg">
                    Starter ⭐
                  </th>
                  <th className="py-3 px-2 text-center">Growth</th>
                  <th className="py-3 px-2 text-center font-bold text-cyan-600">AI Care</th>
                  <th className="py-3 px-2 text-center">Pro</th>
                  <th className="py-3 px-2 text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {/* Price Row */}
                <tr className="font-semibold text-white">
                  <td className="py-3.5 px-3 text-xs uppercase tracking-wider text-white/50 font-medium">
                    Price / mo
                  </td>
                  <td className="py-3.5 px-2 text-center text-xs">
                    {getPriceDisplay(plans[0])}
                  </td>
                  <td className="py-3.5 px-2 text-center text-xs font-bold text-cyan-600 bg-cyan-500/5">
                    {getPriceDisplay(plans[1])}
                  </td>
                  <td className="py-3.5 px-2 text-center text-xs">
                    {getPriceDisplay(plans[2])}
                  </td>
                  <td className="py-3.5 px-2 text-center text-xs font-bold text-cyan-600">
                    {getPriceDisplay(plans[3])}
                  </td>
                  <td className="py-3.5 px-2 text-center text-xs">
                    {getPriceDisplay(plans[4])}
                  </td>
                  <td className="py-3.5 px-2 text-center text-xs">Custom</td>
                </tr>

                {/* Feature Rows */}
                {simpleComparisonRows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3 px-3 font-medium text-xs sm:text-sm text-white/80">
                      {row.feature}
                    </td>
                    {[
                      "free",
                      "starter",
                      "growth",
                      "aicare",
                      "pro",
                      "enterprise",
                    ].map((key) => {
                      const val = (row as any)[key];
                      const isStarter = key === "starter";
                      return (
                        <td
                          key={key}
                          className={`py-3 px-2 text-center text-xs ${
                            isStarter
                              ? "bg-cyan-500/5 font-semibold text-cyan-600"
                              : "text-white/70"
                          }`}
                        >
                          {typeof val === "boolean" ? (
                            val ? (
                              <Check className="w-4 h-4 text-cyan-500 mx-auto" />
                            ) : (
                              <Minus className="w-3.5 h-3.5 text-white/20 mx-auto" />
                            )
                          ) : (
                            <span>{val}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PRICING FAQS */}
        <div className="container px-4 max-w-3xl mx-auto mb-20">
          <div className="text-center mb-8">
            <div className="eyebrow mb-2">FAQ</div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Got questions? <span className="text-white/40">We've got answers.</span>
            </h2>
          </div>

          <div className="glass-dark-card rounded-[28px] p-6 sm:p-8 border border-white/10">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border-b border-white/[0.08] last:border-0"
                >
                  <AccordionTrigger className="text-left font-display font-semibold text-sm sm:text-base py-4 text-white hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-white/60 leading-relaxed pb-4">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* BOTTOM CALL TO ACTION */}
        <div className="container px-4 max-w-4xl mx-auto text-center">
          <div className="glass-dark-card rounded-[32px] p-8 sm:p-12 relative overflow-hidden border border-white/10 shadow-lg">
            <div
              className="pointer-events-none absolute -inset-px rounded-[32px] opacity-60"
              style={{
                background:
                  "radial-gradient(ellipse at top, rgba(6,182,212,0.15) 0%, transparent 60%)",
              }}
            />
            <div className="relative z-10 max-w-xl mx-auto space-y-3">
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                Not sure which plan is right for you?
              </h3>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                Talk directly with our clinical workflow experts. We'll tailor
                the setup to your exact patient call volume.
              </p>
              <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenPlanModal(plans[1])}
                  className="btn-white-pill !px-6 !py-3 !text-sm"
                >
                  Get Started With Starter
                </button>
                <Link
                  to="/contact-us"
                  className="btn-glass-pill !px-6 !py-3 !text-sm"
                >
                  Contact Us Directly
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* PLAN PURCHASE / SETUP CONTACT FORM MODAL */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg bg-[#0b101b] border border-cyan-500/30 text-white shadow-2xl rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold w-fit border border-cyan-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {selectedPlan?.id === "free" ? "Free Tier Setup" : "Plan Onboarding"}
              </span>
            </div>
            <DialogTitle className="text-2xl font-bold font-display text-white">
              {selectedPlan ? `Get Started with ${selectedPlan.name}` : "Plan Onboarding"}
            </DialogTitle>
            <DialogDescription className="text-white/60 text-xs sm:text-sm">
              Review pre-filled details for this plan, edit anything as needed,
              and our team will reach out to activate your line.
            </DialogDescription>
          </DialogHeader>

          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-display text-xl font-bold text-white">
                Request Sent Successfully!
              </h4>
              <p className="text-xs sm:text-sm text-white/70 max-w-sm mx-auto leading-relaxed">
                We've received your request for the{" "}
                <strong className="text-cyan-400 font-semibold">{formPlanName}</strong>.
                Our team will reach out to you within a few hours to complete your clinic
                setup.
              </p>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="btn-white-pill !px-6 !py-2.5 !text-xs mt-4"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 mt-2">
              {/* Pre-filled Plan & Doctors row (User can edit) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-1">
                    Selected Plan
                  </label>
                  <input
                    type="text"
                    value={formPlanName}
                    onChange={(e) => setFormPlanName(e.target.value)}
                    required
                    className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-1">
                    Doctors / Scale
                  </label>
                  <input
                    type="text"
                    value={formDoctors}
                    onChange={(e) => setFormDoctors(e.target.value)}
                    required
                    className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* User Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-400" /> Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Dr. Rajesh / Sarah Jenkins"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" /> Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    placeholder={market === "IN" ? "+91 98765 43210" : "+1 (555) 000-0000"}
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" /> Work Email *
                  </label>
                  <input
                    type="email"
                    placeholder="doctor@clinic.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-cyan-400" /> Clinic / Practice Name
                  </label>
                  <input
                    type="text"
                    placeholder="City Care Polyclinic"
                    value={formOrg}
                    onChange={(e) => setFormOrg(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-cyan-400" /> Pre-filled Requirements & Note (Editable)
                </label>
                <textarea
                  rows={3}
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-400 transition-colors resize-none leading-relaxed"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-full text-xs text-white/60 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-white-pill !px-6 !py-2.5 !text-xs font-semibold shadow-md shadow-cyan-500/25 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>Submitting...</>
                  ) : (
                    <>
                      <span>Submit Request</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <LandingFooter />
    </CosmicFrame>
  );
}
