import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, ArrowLeft, ShieldCheck } from "lucide-react";
import CosmicFrame from "@/components/landing/CosmicFrame";
import LandingNav from "@/components/landing/LandingNav";
import LandingFooter from "@/components/landing/LandingFooter";
import ContactSection from "@/components/landing/ContactSection";

export default function ContactUs() {
  return (
    <CosmicFrame>
      <LandingNav />

      <main className="pt-28 md:pt-36 pb-16">
        {/* Header Hero */}
        <div className="container px-4 max-w-5xl mx-auto mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-cyan-600 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="eyebrow mb-4">Curezy Support & Sales</div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-white leading-tight"
            >
              Let's talk about <span className="text-white/40">your practice.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-base sm:text-lg text-white/60 max-w-xl mx-auto leading-relaxed"
            >
              Whether you want a live demo of our AI Care OS, need technical assistance, or want to partner with Curezy, we're here to help.
            </motion.p>
          </div>
        </div>

        {/* Embedded Interactive Contact Form */}
        <ContactSection id="contact-form" className="!py-4" isStandalonePage={true} />

        {/* Direct Channels & Details */}
        <div className="container px-4 max-w-5xl mx-auto mt-12">
          <div className="text-center mb-8">
            <div className="eyebrow mb-2">Direct channels</div>
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-white">Official Touchpoints</h3>
            <p className="text-sm text-white/50 mt-1">Prefer direct email or phone? Reach us through any of the channels below.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {/* Email Support */}
            <div className="glass-dark-card rounded-2xl p-6 shadow-sm hover:border-cyan-400/40 transition-colors relative overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-white text-sm mb-1">Email Inquiries</h4>
              <p className="text-xs text-white/50 mb-3">General & Sales inquiries:</p>
              <a
                href="mailto:contact@curezy.in"
                className="text-xs font-semibold text-cyan-600 hover:underline block"
              >
                contact@curezy.in
              </a>
              <a
                href="mailto:admin@curezy.in"
                className="text-xs text-white/60 hover:underline block mt-0.5"
              >
                admin@curezy.in
              </a>
            </div>

            {/* Phone Support */}
            <div className="glass-dark-card rounded-2xl p-6 shadow-sm hover:border-emerald-500/40 transition-colors relative overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-white text-sm mb-1">Phone & WhatsApp</h4>
              <p className="text-xs text-white/50 mb-3">Direct executive line:</p>
              <a
                href="tel:+919165043258"
                className="text-xs font-semibold text-emerald-600 hover:underline block"
              >
                +91 9165043258
              </a>
              <span className="text-[11px] text-white/40 block mt-1">Mon–Sat, 9AM – 7PM IST</span>
            </div>

            {/* Business Hours */}
            <div className="glass-dark-card rounded-2xl p-6 shadow-sm hover:border-violet-500/40 transition-colors relative overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-600 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-white text-sm mb-1">Operating Hours</h4>
              <p className="text-xs text-white/50 mb-2">Our support schedule:</p>
              <div className="space-y-1 text-xs text-white/70">
                <div className="flex justify-between">
                  <span>Mon – Sat:</span>
                  <span className="font-medium text-white">9 AM – 7 PM</span>
                </div>
                <div className="flex justify-between text-white/40">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
                <div className="flex justify-between text-emerald-600 pt-1 font-medium">
                  <span>Emergency:</span>
                  <span>24/7 App</span>
                </div>
              </div>
            </div>

            {/* Office Address */}
            <div className="glass-dark-card rounded-2xl p-6 shadow-sm hover:border-amber-500/40 transition-colors relative overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-white text-sm mb-1">Registered Office</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Curezy LLP<br />
                27-A Kushwah Shri Nagar, Indore - 452015<br />
                Madhya Pradesh, India
              </p>
            </div>
          </div>

          {/* Grievance & Legal Notice */}
          <div className="glass-dark-card rounded-2xl p-6 text-xs text-white/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-white/40 shrink-0" />
              <div>
                <span className="font-medium text-white">Grievance Redressal:</span> In accordance with the IT Act 2000, grievances are acknowledged within 48h. Reach out at{" "}
                <a href="mailto:admin@curezy.in" className="text-cyan-600 underline font-medium">
                  admin@curezy.in
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4 shrink-0 text-white/50">
              <Link to="/privacy-policy" className="hover:text-white underline">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-white underline">Terms of Service</Link>
            </div>
          </div>
        </div>
      </main>

      <LandingFooter />
    </CosmicFrame>
  );
}
