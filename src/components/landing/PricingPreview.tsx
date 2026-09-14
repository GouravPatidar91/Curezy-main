import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, CheckCircle2, User, Mail, Phone, Building2, HelpCircle, MessageSquare, Send, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
    mostPopular: true, // Popular plan is now Starter
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

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanPreview | null>(null);

  // Form Fields (pre-filled according to plan, but fully editable)
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formOrg, setFormOrg] = useState("");
  const [formPlanInterest, setFormPlanInterest] = useState("");
  const [formDoctors, setFormDoctors] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Automatic Geolocation Detection (US -> USD, India -> INR)
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      if (tz.includes("Kolkata") || tz.includes("Calcutta") || tz.includes("Delhi") || tz === "Asia/Colombo") {
        setMarket("IN");
        return;
      }
      if (tz.startsWith("America/") || tz.startsWith("US/") || tz.includes("Honolulu")) {
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
    return market === "IN" ? `₹${discounted.toLocaleString("en-IN")}` : `$${discounted}`;
  };

  // Open modal with pre-filled details for the clicked plan
  const handleOpenPlanModal = (plan: PlanPreview) => {
    setSelectedPlan(plan);
    setFormPlanInterest(`${plan.name} Plan`);
    setFormDoctors(plan.defaultDoctors);

    const priceText = getPriceDisplay(plan);
    const billingText = isYearly ? "Yearly billing (15% off)" : "Monthly billing";

    if (plan.planId === "free") {
      setFormMessage(
        `Hi Curezy team, I would like to activate the Free AI Receptionist tier (30 voice mins/mo) for my clinic. Please send me setup instructions.`
      );
    } else if (plan.isCustom) {
      setFormMessage(
        `Hi Curezy team, we are interested in the Enterprise plan for our healthcare practice. Please reach out to discuss custom concurrency, EMR integrations, and volume pricing.`
      );
    } else {
      setFormMessage(
        `Hi Curezy team, I would like to purchase the ${plan.name} plan (${priceText}/mo, ${billingText}) for our clinic. Please contact me with onboarding and setup details.`
      );
    }

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
      const { error: dbError } = await supabase.from("contact_submissions").insert([
        {
          name: formName.trim(),
          email: formEmail.trim().toLowerCase(),
          phone: formPhone.trim(),
          organization: formOrg.trim() || null,
          role: formPlanInterest,
          service_interest: `${formPlanInterest} (${market} - ${isYearly ? "Yearly" : "Monthly"})`,
          message: `${formMessage.trim()} [Doctors/Scale: ${formDoctors}]`,
        },
      ]);

      if (dbError) {
        console.warn("Supabase insert warning:", dbError);
      }

      // 2. Dispatch email to contact@curezy.in
      try {
        await fetch("https://formsubmit.co/ajax/contact@curezy.in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            _subject: `New Plan Order/Inquiry: ${formName} - ${formPlanInterest}`,
            _template: "table",
            "Plan Selected": formPlanInterest,
            "Billing Cycle": isYearly ? "Yearly (15% off)" : "Monthly",
            "Region": market === "IN" ? "India (₹ INR)" : "US / International ($ USD)",
            "Price": selectedPlan ? getPriceDisplay(selectedPlan) : "N/A",
            "Doctors / Providers": formDoctors,
            "Full Name": formName.trim(),
            "Email Address": formEmail.trim(),
            "Phone Number": formPhone.trim(),
            "Clinic / Hospital": formOrg.trim() || "Not specified",
            "Customer Requirements": formMessage.trim(),
            "Timestamp": new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
          }),
        });
      } catch (err) {
        console.warn("Email alert error:", err);
      }

      setIsSubmitted(true);
      toast.success("Thank you! Your plan inquiry has been sent to contact@curezy.in. Our team will contact you shortly.");
    } catch (err: any) {
      console.error("Submission failed:", err);
      toast.error(err?.message || "Failed to submit. Please try again or email contact@curezy.in directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="pricing" className="py-24 md:py-36 relative">
      <div className="container px-4 max-w-7xl mx-auto">
        {/* Section Heading matching landing page theme */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10">
          <div className="eyebrow mb-3">Transparent Plans</div>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.02] font-semibold tracking-[-0.03em] text-white">
            Launch free today. <span className="text-white/40">Scale anytime.</span>
          </h2>
          <p className="mt-4 text-white/60 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            No credit card required. Upgrade only when your clinic needs more automation.
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

        {/* 4 Pricing Cards Grid (Free, Starter [Popular], Growth, Enterprise) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto items-end mb-12">
          {pricingData.map((plan, index) => {
            const isPopular = plan.mostPopular;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={
                  isPopular
                    ? "bg-gradient-to-b from-cyan-400 via-sky-400 to-cyan-500 rounded-[32px] p-2 shadow-2xl shadow-cyan-500/30 scale-[1.03] z-10 transition-transform"
                    : ""
                }
              >
                {isPopular && (
                  <p className="text-center text-slate-950 font-bold text-xs py-2 flex items-center justify-center gap-1.5 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" /> Most Popular
                  </p>
                )}

                <div
                  className={`rounded-[28px] p-6 sm:p-7 flex flex-col justify-between h-full ${
                    isPopular
                      ? "bg-white/95 backdrop-blur-xl"
                      : "glass-dark-card border border-white/10 hover:border-cyan-300/40 hover:shadow-xl transition-all"
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="font-display font-bold text-lg text-white">
                        {plan.name}
                      </h3>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600">
                        {plan.voiceMinutes}
                      </span>
                    </div>

                    <p className="text-xs text-white/50 min-h-[32px] leading-relaxed mb-6">
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
                        <li key={i} className="flex items-start gap-2.5 text-xs text-white/70 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button opens Contact Modal with prefilled plan info */}
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
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Single Clean Action Link (Start Free button removed as requested) */}
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

      {/* Plan Purchase / Setup Modal Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-xl w-full p-0 overflow-hidden rounded-[28px] border border-slate-200/90 bg-white/95 backdrop-blur-2xl shadow-2xl">
          <div className="relative p-6 sm:p-8">
            <DialogHeader className="mb-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 text-xs font-semibold w-fit mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                {selectedPlan?.name} Plan Setup
              </div>
              <DialogTitle className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                Get Started with {selectedPlan?.name}
              </DialogTitle>
              <DialogDescription className="text-slate-500 text-xs sm:text-sm">
                Enter your details below. We've pre-filled the plan details for you — feel free to edit any information.
              </DialogDescription>
            </DialogHeader>

            {isSubmitted ? (
              <div className="py-8 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Request Received!</h4>
                <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-900">{formName}</strong>. A confirmation has been dispatched to{" "}
                  <strong className="text-slate-900">contact@curezy.in</strong>. Our healthcare solutions team will contact you within 24 hours to set up your clinic's AI system.
                </p>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-white-pill !bg-slate-900 !text-white hover:!bg-slate-800"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-cyan-600" /> Full Name *
                    </label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Dr. Sarah Sharma"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-cyan-600" /> Work / Personal Email *
                    </label>
                    <input
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="sarah@cityclinic.com"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-cyan-600" /> Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-all"
                    />
                  </div>

                  {/* Clinic / Hospital */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-cyan-600" /> Clinic / Organization
                    </label>
                    <input
                      type="text"
                      value={formOrg}
                      onChange={(e) => setFormOrg(e.target.value)}
                      placeholder="Apex Care Polyclinic"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-all"
                    />
                  </div>
                </div>

                {/* Pre-filled Plan & Doctor count (editable) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-cyan-600" /> Selected Plan (Editable)
                    </label>
                    <input
                      type="text"
                      value={formPlanInterest}
                      onChange={(e) => setFormPlanInterest(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 font-medium px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-cyan-600" /> Number of Doctors / Scale
                    </label>
                    <input
                      type="text"
                      value={formDoctors}
                      onChange={(e) => setFormDoctors(e.target.value)}
                      placeholder="e.g. 1, 1–2, 5+"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                {/* Message (Pre-filled according to plan, editable) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-cyan-600" /> Requirements & Notes (Editable)
                  </label>
                  <textarea
                    rows={3}
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs sm:text-sm text-slate-900 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-all resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-4">
                  <span className="text-[11px] text-slate-400">
                    Sends to <strong className="text-slate-600">contact@curezy.in</strong> · Reply &lt; 24h
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-white-pill !px-6 !py-3 !text-xs cursor-pointer shadow-md shadow-cyan-500/20 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Confirm Request <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
