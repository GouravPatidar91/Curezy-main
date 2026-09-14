import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { openContactModal } from "@/components/landing/ContactModal";

type Market = "IN" | "US";

interface PlanPreview {
  name: string;
  planId: string;
  subtitle: string;
  isCustom?: boolean;
  monthlyPrice: { IN: number; US: number };
  voiceMinutes: string;
  mostPopular?: boolean;
  defaultDoctors: string;
  features: string[];
  ctaText: string;
}

const pricingData: PlanPreview[] = [
  {
    name: "Free",
    planId: "free",
    subtitle: "B2B Acquisition · 30 mins/mo",
    monthlyPrice: { IN: 0, US: 0 },
    voiceMinutes: "30 min",
    defaultDoctors: "1",
    features: [
      "30 AI voice minutes/month",
      "1 doctor & 1 clinic",
      "AI Receptionist Lite",
      "Appointment booking & FAQs",
      "Limited WhatsApp AI",
      "No credit card required",
    ],
    ctaText: "Start Free",
  },
  {
    name: "Starter",
    planId: "starter",
    subtitle: "For solo practicing doctors",
    monthlyPrice: { IN: 999, US: 39 },
    voiceMinutes: "100 min",
    mostPopular: true,
    defaultDoctors: "1",
    features: [
      "100 AI voice minutes/month",
      "1 doctor & 1 clinic",
      "Full WhatsApp AI Assistant",
      "Appointment automation",
      "Patient reminders & follow-ups",
      "Basic transcription & analytics",
    ],
    ctaText: "Choose Starter",
  },
  {
    name: "Growth",
    planId: "growth",
    subtitle: "For growing polyclinics",
    monthlyPrice: { IN: 1999, US: 79 },
    voiceMinutes: "250 min",
    defaultDoctors: "1–2",
    features: [
      "250 AI voice minutes/month",
      "1–2 doctor schedules",
      "Call recording & summaries",
      "Patient reactivation campaigns",
      "Automated follow-ups",
      "Basic AI Health Twin",
    ],
    ctaText: "Choose Growth",
  },
  {
    name: "Enterprise",
    planId: "enterprise",
    subtitle: "For hospitals & healthcare chains",
    isCustom: true,
    monthlyPrice: { IN: 0, US: 0 },
    voiceMinutes: "Custom",
    defaultDoctors: "5+",
    features: [
      "Custom AI agents & persona",
      "Unlimited doctors & branches",
      "Dedicated telephony & concurrency",
      "EHR / EMR bi-directional sync",
      "Custom AI Health Twin architecture",
      "Dedicated 24/7 support & SLA",
    ],
    ctaText: "Contact Sales",
  },
];

export default function PricingPreview() {
  const [isYearly, setIsYearly] = useState(false);
  const [market, setMarket] = useState<Market>("IN");

  // Automatic Geolocation Detection (US -> USD, India -> INR)
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

  const getPriceDisplay = (plan: PlanPreview) => {
    if (plan.isCustom) return "Custom";
    const monthly = plan.monthlyPrice[market];
    if (monthly === 0) return market === "IN" ? "₹0" : "$0";
    const discounted = isYearly ? Math.round(monthly * 0.85) : monthly;
    return market === "IN"
      ? `₹${discounted.toLocaleString("en-IN")}`
      : `$${discounted}`;
  };

  // Open the global minimal contact modal with pre-filled details for the clicked plan
  const handleOpenPlanModal = (plan: PlanPreview) => {
    const priceText = getPriceDisplay(plan);
    const billingText = isYearly ? "Yearly billing (15% off)" : "Monthly billing";

    let defaultMsg = `Hi Curezy team, I would like to get started with the ${plan.name} plan (${priceText}/mo, ${billingText}) for our clinic. Please contact me with onboarding details.`;
    if (plan.planId === "free") {
      defaultMsg = `Hi Curezy team, I would like to activate the Free AI Receptionist tier (30 voice mins/mo) for my clinic. Please send me setup instructions.`;
    } else if (plan.isCustom) {
      defaultMsg = `Hi Curezy team, we are interested in the Enterprise plan for our healthcare practice. Please reach out to discuss custom concurrency, EMR integrations, and volume pricing.`;
    }

    openContactModal({
      planName: `${plan.name} Plan`,
      doctors: plan.defaultDoctors,
      message: defaultMsg,
    });
  };

  return (
    <section id="pricing" className="py-24 md:py-36 relative">
      <div className="container px-4 max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="eyebrow mb-3">Transparent Plans</div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-white">
            Simple, predictable <span className="text-white/40">pricing.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/60 leading-relaxed">
            Start completely free with 30 AI voice minutes each month. Upgrade seamlessly as your patient call volume grows.
          </p>

          {/* Billing Cycle Switcher: Monthly / Yearly (15% off) */}
          <div className="mt-8 flex items-center justify-center">
            <div className="relative p-1 glass-dark-card rounded-full inline-flex items-center w-64 border border-white/10 shadow-sm">
              <div
                className={`absolute w-[calc(50%-4px)] h-[38px] rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 transition-transform duration-300 ease-in-out pointer-events-none shadow-md shadow-cyan-500/25 ${
                  isYearly ? "translate-x-full" : "translate-x-0"
                }`}
              />

              <button
                type="button"
                onClick={() => setIsYearly(false)}
                className={`relative z-10 flex-1 py-2 cursor-pointer rounded-full text-xs font-bold text-center transition-colors duration-300 ${
                  !isYearly ? "text-pure-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Monthly
              </button>

              <button
                type="button"
                onClick={() => setIsYearly(true)}
                className={`relative z-10 flex-1 py-2 cursor-pointer rounded-full text-xs font-bold text-center flex items-center justify-center gap-1 transition-colors duration-300 ${
                  isYearly ? "text-pure-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>Yearly</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/25 text-pure-white font-extrabold">
                  15% off
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Cards Grid: Free, Starter (Most Popular), Growth, Enterprise */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 items-stretch">
          {pricingData.map((plan, idx) => {
            const isPopular = plan.mostPopular;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`relative flex flex-col justify-between rounded-[32px] p-6 sm:p-7 transition-all ${
                  isPopular
                    ? "glass-dark-card border-2 border-cyan-400 shadow-[0_20px_50px_-20px_rgba(6,182,212,0.4)] ring-4 ring-cyan-400/10 scale-[1.02] z-10"
                    : "glass-dark-card border border-white/10 hover:border-cyan-300/40 shadow-sm hover:shadow-md"
                }`}
              >
                <div>
                  {/* Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                      {plan.name}
                    </h3>
                    {isPopular && (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 text-white shadow-sm">
                        <Sparkles className="w-3 h-3" />
                        Popular
                      </span>
                    )}
                    {plan.planId === "free" && (
                      <span className="text-[10px] uppercase font-semibold tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 border border-cyan-500/20">
                        Free tier
                      </span>
                    )}
                  </div>

                  {/* Subtitle */}
                  <p className="text-xs text-white/50 min-h-[32px] leading-relaxed mb-4">
                    {plan.subtitle}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-white/[0.08]">
                    <span className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                      {getPriceDisplay(plan)}
                    </span>
                    {!plan.isCustom && (
                      <span className="text-white/40 text-xs">/ month</span>
                    )}
                  </div>

                  {/* Features list */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button opens Global Minimal Contact Modal with prefilled plan info */}
                <button
                  type="button"
                  onClick={() => handleOpenPlanModal(plan)}
                  className={`w-full cursor-pointer py-3 rounded-full text-xs font-semibold transition-all ${
                    isPopular
                      ? "btn-white-pill justify-center shadow-lg shadow-cyan-500/30"
                      : "btn-glass-pill justify-center hover:!border-cyan-400"
                  }`}
                >
                  {plan.ctaText}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Single Clean Action Link */}
        <div className="flex items-center justify-center text-center">
          <Link
            to="/pricing"
            className="btn-glass-pill !px-9 !py-4 !text-sm inline-flex items-center gap-2 group shadow-sm hover:!border-cyan-400"
          >
            <span>View Full Pricing & All 6 Tiers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
