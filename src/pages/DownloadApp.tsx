import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Stethoscope,
  Pill,
  ShieldCheck,
  FileText,
  CreditCard,
  Phone,
  CheckCircle2,
  Star,
  Download,
  ArrowRight,
  Sparkles,
  Smartphone,
  Lock,
} from "lucide-react";
import CosmicFrame from "@/components/landing/CosmicFrame";
import LandingNav from "@/components/landing/LandingNav";
import LandingFooter from "@/components/landing/LandingFooter";
import SEO from "@/components/common/SEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.curezy.app";
const UPTODOWN_URL = "https://curezy.en.uptodown.com/android";
const PLAY_BADGE =
  "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png";

const features = [
  {
    icon: Sparkles,
    title: "AI Symptom Checker",
    desc: "Describe what you feel in natural language. Get clinical guidance, triage recommendations, and urgency assessment.",
    badge: "AI Powered",
  },
  {
    icon: Stethoscope,
    title: "Doctor Consultations",
    desc: "Find verified specialists near you and book video, audio, or in-person clinic visits with zero waiting friction.",
    badge: "Verified Doctors",
  },
  {
    icon: Pill,
    title: "Instant Medicine Delivery",
    desc: "Upload prescriptions and receive medicines from licensed local pharmacies delivered directly to your doorstep.",
    badge: "Fast Delivery",
  },
  {
    icon: Phone,
    title: "24/7 Emergency Assistance",
    desc: "One-tap SOS dispatch with real-time GPS location sharing and automated responder alerts when every second counts.",
    badge: "24/7 SOS",
  },
  {
    icon: FileText,
    title: "Encrypted Health Vault",
    desc: "Safely store lab reports, prescriptions, and medical histories with smart AI summarization for follow-up consults.",
    badge: "ABDM Ready",
  },
  {
    icon: CreditCard,
    title: "Zero-Friction Payments",
    desc: "Secure checkout powered by Razorpay. Seamlessly pay via UPI, Credit/Debit cards, or Net Banking with zero hidden fees.",
    badge: "100% Secure",
  },
];

const trustPoints = [
  { title: "HIPAA & DPDP Aligned", desc: "Sovereign data encryption at rest and in transit." },
  { title: "Verified Clinicians", desc: "Every practicing doctor and clinic is strictly vetted." },
  { title: "Zero Data Selling", desc: "Your personal health records belong strictly to you." },
  { title: "Proudly Made in India", desc: "Engineered in Indore, MP for India's healthcare needs." },
];

const steps = [
  {
    num: "01",
    title: "Install the app",
    desc: "Download Curezy free from Google Play or Uptodown in under 30 seconds.",
  },
  {
    num: "02",
    title: "Quick phone setup",
    desc: "Sign in with a simple OTP. No passwords to remember, no tedious paperwork.",
  },
  {
    num: "03",
    title: "Access care instantly",
    desc: "Check symptoms, consult doctors, and order medications right from your phone.",
  },
];

const faqs = [
  {
    q: "Is the Curezy app free to download?",
    a: "Yes. Curezy is 100% free to download from Google Play. You only pay for medical consultations or medicines you order directly through the app.",
  },
  {
    q: "Which devices and Android versions are supported?",
    a: "Curezy runs smoothly on Android 7.0 (Nougat) and above, supporting both budget and flagship smartphones.",
  },
  {
    q: "How does the AI Symptom Checker protect my privacy?",
    a: "Your symptom conversations are fully encrypted and never used for advertising. Curezy adheres to India's Digital Personal Data Protection (DPDP) Act.",
  },
  {
    q: "Do I need a prescription to order medicines?",
    a: "For scheduled prescription drugs, you can easily snap and upload a photo of your doctor's prescription during checkout. OTC items can be ordered directly.",
  },
  {
    q: "How do I reach emergency or customer support?",
    a: "Reach our 24/7 support line at +91 9165043258 or email admin@curezy.in. The in-app emergency button also triggers instant responder alerts.",
  },
];

const DownloadApp = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <CosmicFrame>
      <SEO
        title="Download Curezy App — AI Health Assistant on Google Play"
        description="Download the Curezy Android app on Google Play. AI symptom checker, online doctor consultations, medicine delivery, and 24/7 emergency assistance. Free."
        canonical="https://www.curezy.in/download"
      />
      <LandingNav />

      <main className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden">
        {/* Hero Section */}
        <div className="container relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Live Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-700 text-[11px] font-semibold px-3.5 py-1.5 mb-6 shadow-[0_0_20px_-3px_rgba(6,182,212,0.3)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            LIVE ON GOOGLE PLAY · ANDROID APP V1.0
          </motion.div>



          {/* Clean Minimal Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-slate-900 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.035em] leading-[1.08]"
          >
            Healthcare in your pocket.
            <br />
            <span className="bg-gradient-to-r from-cyan-600 via-[#2563ff] to-blue-700 bg-clip-text text-transparent">
              Empowered by Clinical AI.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            AI symptom checks, verified doctor consultations, instant medicine
            delivery, and 24/7 emergency support — unified into a clean, minimal
            Android application.
          </motion.p>

          {/* Download Buttons & Specs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mt-8 flex flex-col items-center gap-4"
          >
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get Curezy on Google Play"
              className="inline-block transition-transform hover:scale-105"
            >
              <img
                src={PLAY_BADGE}
                alt="Get it on Google Play"
                className="h-16 sm:h-20 w-auto"
              />
            </a>

            {/* Quick Specs Pill */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-slate-500 font-medium">
              <span className="inline-flex items-center gap-1 text-slate-700">
                <Download className="w-3.5 h-3.5 text-[#2563ff]" /> Free Download
              </span>
              <span className="w-1 h-1 bg-slate-300 rounded-full" />
              <span>Android 7.0+</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full" />
              <span className="inline-flex items-center gap-1 text-amber-600 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                4.8 Rating
              </span>
            </div>

            <a
              href={UPTODOWN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-400 hover:text-[#2563ff] transition-colors underline-offset-4 hover:underline mt-1"
            >
              Alternative direct mirror: Download via Uptodown
            </a>
          </motion.div>

          {/* App Preview Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-14 max-w-3xl mx-auto"
          >
            <div className="relative rounded-3xl border border-slate-200/80 bg-white/70 backdrop-blur-md p-4 sm:p-6 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.12)]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {[
                  { img: "/src/assets/app-mockup-1.png", label: "" },
                  { img: "/src/assets/app-mockup-2.png", label: "" },
                  { img: "/src/assets/app-mockup-3.png", label: "" },
                  { img: "/src/assets/app-mockup-4.png", label: "" },
                ].map((item, idx) => (
                  <div key={idx} className="group flex flex-col items-center">
                    <div className="w-full aspect-[9/16] overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-[#2563ff]/30 transition-all duration-300">
                      <img
                        src={item.img}
                        alt={item.label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback if asset path differs
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>
                    <span className="mt-2 text-[11px] font-medium text-slate-500">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Capabilities Grid (Clean & Minimal) */}
        <section className="mt-24 sm:mt-32 border-t border-slate-200/70 pt-20">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="eyebrow mb-2">Core Features</div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-[-0.03em]">
                Everything you need for smarter care
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base">
                Engineered for rapid response, high clinical accuracy, and zero technical hassle.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_-8px_rgba(15,23,42,0.06)] hover:border-[#2563ff]/40 hover:shadow-[0_12px_30px_-10px_rgba(37,99,255,0.12)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-[#2563ff] group-hover:bg-[#2563ff] group-hover:text-white transition-colors duration-200">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                          {feat.badge}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-slate-900 text-base mb-2 group-hover:text-[#2563ff] transition-colors">
                        {feat.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3 Simple Steps */}
        <section className="mt-24 sm:mt-32">
          <div className="container max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="eyebrow mb-2">Getting Started</div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-[-0.03em]">
                Three steps to personal care
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {steps.map((st, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm relative overflow-hidden"
                >
                  <div className="text-4xl font-extrabold font-display text-cyan-600/20 mb-3">
                    {st.num}
                  </div>
                  <h3 className="font-display font-bold text-slate-900 text-base mb-2">
                    {st.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* FAQs */}
        <section className="mt-24 sm:mt-32">
          <div className="container max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <div className="eyebrow mb-2">App Questions</div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-[-0.03em]">
                Frequently asked questions
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="bg-white border border-slate-200/80 rounded-2xl px-5 shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="text-left font-display font-semibold text-slate-900 text-sm sm:text-base hover:no-underline py-4">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-slate-600 leading-relaxed pb-4">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-24 sm:mt-32 text-center">
          <div className="container max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Ready to take charge of your health?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mb-8 max-w-xl mx-auto">
              Join patients across India who rely on Curezy for fast doctor access,
              accurate AI insights, and reliable medical delivery.
            </p>
            <div className="flex flex-col items-center gap-3">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get Curezy on Google Play"
                className="inline-block transition-transform hover:scale-105"
              >
                <img
                  src={PLAY_BADGE}
                  alt="Get it on Google Play"
                  className="h-16 sm:h-20 w-auto"
                />
              </a>
              <a
                href={UPTODOWN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-500 hover:text-[#2563ff] transition-colors underline-offset-4 hover:underline"
              >
                Download APK directly from Uptodown
              </a>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </CosmicFrame>
  );
};

export default DownloadApp;
