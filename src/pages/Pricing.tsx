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

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  // Automatic Geolocation Detection (No manual toggle)
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
      const languages = navigator.languages || [navigator.language || ""];
      if (languages.some((l) => l.includes("-US"))) {
        setMarket("US");
        return;
      }
      if (languages.some((l) => l.includes("-IN") || l.startsWith("hi"))) {
        setMarket("IN");
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
        <div className="container px-4 max-w-4xl mx-auto text-center mb-10">
          <div className="eyebrow mb-3">Transparent Pricing</div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.03em] text-slate-900 leading-[1.08]"
          >
            Predictable plans for{" "}
            <span className="text-slate-400">modern healthcare.</span>
          </motion.h1>

          <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            Choose the right tier for your clinic or hospital practice. Start
            completely free with 30 AI minutes each month.
          </p>

          {/* Clean Annual Discount Toggle */}
          <div className="mt-6 inline-flex items-center gap-1.5 p-1 rounded-full bg-slate-100 border border-slate-200 shadow-inner">
            <button
              type="button"
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                !isYearly
                  ? "bg-gradient-to-r from-cyan-500 to-sky-500 text-pure-white shadow-md shadow-cyan-500/25"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setIsYearly(true)}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold transition-all ${
                isYearly
                  ? "bg-gradient-to-r from-cyan-500 to-sky-500 text-pure-white shadow-md shadow-cyan-500/25"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>Yearly</span>
              <span
                className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full border transition-colors ${
                  isYearly
                    ? "bg-white/20 text-pure-white border-white/30"
                    : "bg-cyan-50 text-cyan-700 border-cyan-200"
                }`}
              >
                Save 15%
              </span>
            </button>
          </div>
        </div>

        {/* PRICING CARDS CAROUSEL SECTION */}
        <div className="container px-4 max-w-7xl mx-auto mb-20">
          {/* Carousel Header & Navigation Controls */}
          <div className="flex items-center justify-between mb-6 px-2">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-bold text-slate-500">
                Explore Plans
              </span>
              <span className="text-xs text-cyan-700 font-semibold bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-200">
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
                className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:text-slate-900 hover:border-cyan-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                disabled={!canScrollNext}
                aria-label="Next plan"
                className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:text-slate-900 hover:border-cyan-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
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
                      className={`h-full flex flex-col justify-between rounded-[28px] p-6 sm:p-7 relative transition-all overflow-hidden bg-white ${
                        isPopular
                          ? "border-2 border-cyan-500 shadow-[0_20px_50px_-15px_rgba(6,182,212,0.35)] ring-4 ring-cyan-500/10"
                          : "border border-slate-200/90 hover:border-slate-300 shadow-sm"
                      }`}
                    >
                      {/* Top Popular Subtle Glow */}
                      {isPopular && (
                        <div
                          className="pointer-events-none absolute -inset-px rounded-[28px]"
                          style={{
                            background:
                              "radial-gradient(120% 50% at 50% 0%, rgba(6,182,212,0.12), transparent 70%)",
                          }}
                        />
                      )}

                      <div className="relative z-10">
                        {/* Plan Header */}
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <h3 className="font-display text-2xl font-bold text-slate-900">
                            {plan.name}
                          </h3>
                          {plan.badge && (
                            <span
                              className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                                isPopular
                                  ? "bg-gradient-to-r from-cyan-600 to-sky-600 text-white shadow-sm"
                                  : "bg-cyan-50 text-cyan-800 border border-cyan-200/80"
                              }`}
                            >
                              {plan.badge}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-600 min-h-[32px] leading-relaxed mb-5 font-medium">
                          {plan.target[market]}
                        </p>

                        {/* Price Display */}
                        <div className="mb-5 pb-5 border-b border-slate-100">
                          <div className="flex items-baseline gap-1">
                            <span className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                              {getPriceDisplay(plan)}
                            </span>
                            {plan.period && (
                              <span className="text-xs font-semibold text-slate-400">
                                {plan.period}
                              </span>
                            )}
                          </div>
                          <div className="mt-2.5 flex items-center gap-2 text-xs text-cyan-700 font-bold">
                            <PhoneCall className="w-3.5 h-3.5 text-cyan-600" />
                            <span>{plan.voiceMinutes}</span>
                            <span className="text-slate-300">·</span>
                            <span className="text-slate-600 font-medium">
                              {plan.providers}
                            </span>
                          </div>
                        </div>

                        {/* High-contrast Features List */}
                        <div className="space-y-2.5 mb-6">
                          <div className="text-[11px] uppercase tracking-wider font-bold text-slate-500">
                            Key features:
                          </div>
                          {plan.features.map((feat, fIdx) => (
                            <div
                              key={fIdx}
                              className="flex items-start gap-2.5 text-xs text-slate-700 font-medium leading-relaxed"
                            >
                              <Check className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="relative z-10 pt-4 mt-auto border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => handleOpenPlanModal(plan)}
                          className={`w-full justify-center !text-sm !py-3 rounded-full cursor-pointer transition-all ${
                            isPopular
                              ? "btn-white-pill !text-white font-semibold shadow-md shadow-cyan-500/30"
                              : "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 hover:border-cyan-500 hover:text-cyan-700 font-semibold shadow-sm"
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
                    ? "w-7 bg-cyan-600 shadow-sm shadow-cyan-600/50"
                    : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* SIMPLE, CLEAN COMPARISON TABLE */}
        <div className="container px-4 max-w-6xl mx-auto mb-24">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="eyebrow mb-2">Compare Features</div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Feature <span className="text-slate-400">breakdown.</span>
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Clean side-by-side comparison across all tiers.
            </p>
          </div>

          <div className="bg-white rounded-[28px] p-4 sm:p-6 overflow-x-auto shadow-sm border border-slate-200/90">
            <table className="w-full text-left text-sm min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-3">Plan</th>
                  <th className="py-3 px-2 text-center text-slate-700">Free</th>
                  <th className="py-3 px-2 text-center text-cyan-700 font-bold bg-cyan-50/70 rounded-t-lg">
                    Starter ⭐
                  </th>
                  <th className="py-3 px-2 text-center text-slate-700">Growth</th>
                  <th className="py-3 px-2 text-center font-bold text-cyan-700">AI Care</th>
                  <th className="py-3 px-2 text-center text-slate-700">Pro</th>
                  <th className="py-3 px-2 text-center text-slate-700">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* Price Row */}
                <tr className="font-semibold text-slate-900">
                  <td className="py-3.5 px-3 text-xs uppercase tracking-wider text-slate-500 font-bold">
                    Price / mo
                  </td>
                  <td className="py-3.5 px-2 text-center text-xs font-bold text-slate-800">
                    {getPriceDisplay(plans[0])}
                  </td>
                  <td className="py-3.5 px-2 text-center text-xs font-extrabold text-cyan-700 bg-cyan-50/70">
                    {getPriceDisplay(plans[1])}
                  </td>
                  <td className="py-3.5 px-2 text-center text-xs font-bold text-slate-800">
                    {getPriceDisplay(plans[2])}
                  </td>
                  <td className="py-3.5 px-2 text-center text-xs font-extrabold text-cyan-700">
                    {getPriceDisplay(plans[3])}
                  </td>
                  <td className="py-3.5 px-2 text-center text-xs font-bold text-slate-800">
                    {getPriceDisplay(plans[4])}
                  </td>
                  <td className="py-3.5 px-2 text-center text-xs font-bold text-slate-800">Custom</td>
                </tr>

                {/* Feature Rows */}
                {simpleComparisonRows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3 px-3 font-medium text-xs sm:text-sm text-slate-700">
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
                              ? "bg-cyan-50/70 font-bold text-cyan-700"
                              : "text-slate-600 font-medium"
                          }`}
                        >
                          {typeof val === "boolean" ? (
                            val ? (
                              <Check className="w-4 h-4 text-cyan-600 mx-auto" />
                            ) : (
                              <Minus className="w-3.5 h-3.5 text-slate-300 mx-auto" />
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
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Got questions? <span className="text-slate-400">We've got answers.</span>
            </h2>
          </div>

          <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-slate-200/90 shadow-sm">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border-b border-slate-100 last:border-0"
                >
                  <AccordionTrigger className="text-left font-display font-semibold text-sm sm:text-base py-4 text-slate-900 hover:text-cyan-700 hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-slate-600 leading-relaxed pb-4">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* BOTTOM CALL TO ACTION */}
        <div className="container px-4 max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-[32px] p-8 sm:p-12 relative overflow-hidden border border-slate-200/90 shadow-lg">
            <div
              className="pointer-events-none absolute -inset-px rounded-[32px] opacity-60"
              style={{
                background:
                  "radial-gradient(ellipse at top, rgba(6,182,212,0.12) 0%, transparent 60%)",
              }}
            />
            <div className="relative z-10 max-w-xl mx-auto space-y-3">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Not sure which plan is right for you?
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                Talk directly with our clinical workflow experts. We'll tailor
                the setup to your exact patient call volume.
              </p>
              <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenPlanModal(plans[1])}
                  className="btn-white-pill !px-6 !py-3 !text-sm !font-semibold shadow-md shadow-cyan-500/25 cursor-pointer"
                >
                  Get Started With Starter
                </button>
                <a
                  href="/#contact"
                  className="border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 hover:border-cyan-500 font-semibold rounded-full px-6 py-3 text-sm shadow-sm transition-all"
                >
                  Contact Us Directly
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* PLAN PURCHASE / SETUP CONTACT FORM MODAL */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg bg-white border border-slate-200 text-slate-900 shadow-2xl rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-bold w-fit border border-cyan-200">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              <span>
                {selectedPlan?.id === "free" ? "Free Tier Setup" : "Plan Onboarding"}
              </span>
            </div>
            <DialogTitle className="text-2xl font-bold font-display text-slate-900">
              {selectedPlan ? `Get Started with ${selectedPlan.name}` : "Plan Onboarding"}
            </DialogTitle>
            <DialogDescription className="text-slate-500 text-xs sm:text-sm">
              Review pre-filled details for this plan, edit anything as needed,
              and our team will reach out to activate your line.
            </DialogDescription>
          </DialogHeader>

          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center mx-auto border border-cyan-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-display text-xl font-bold text-slate-900">
                Request Sent Successfully!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                We've received your request for the{" "}
                <strong className="text-cyan-700 font-semibold">{formPlanName}</strong>.
                Our team will reach out to you within a few hours to complete your clinic
                setup.
              </p>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="btn-white-pill !px-6 !py-2.5 !text-xs mt-4 !font-semibold"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 mt-2">
              {/* Pre-filled Plan & Doctors row (User can edit) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Selected Plan
                  </label>
                  <input
                    type="text"
                    value={formPlanName}
                    onChange={(e) => setFormPlanName(e.target.value)}
                    required
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Doctors / Scale
                  </label>
                  <input
                    type="text"
                    value={formDoctors}
                    onChange={(e) => setFormDoctors(e.target.value)}
                    required
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* User Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-600" /> Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Dr. Rajesh / Sarah Jenkins"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-cyan-600" /> Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    placeholder={market === "IN" ? "+91 98765 43210" : "+1 (555) 000-0000"}
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-600" /> Work Email *
                  </label>
                  <input
                    type="email"
                    placeholder="doctor@clinic.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-cyan-600" /> Clinic / Practice Name
                  </label>
                  <input
                    type="text"
                    placeholder="City Care Polyclinic"
                    value={formOrg}
                    onChange={(e) => setFormOrg(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-cyan-600" /> Pre-filled Requirements & Note (Editable)
                </label>
                <textarea
                  rows={3}
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white transition-colors resize-none leading-relaxed"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
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
