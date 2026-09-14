import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { Send, CheckCircle2, Building2, User, Mail, Phone, MessageSquare, Sparkles, HelpCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ContactSectionProps {
  id?: string;
  className?: string;
  isStandalonePage?: boolean;
}

export default function ContactSection({ id = "contact", className = "", isStandalonePage = false }: ContactSectionProps) {
  const [searchParams] = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [interest, setInterest] = useState("Clinic AI OS");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const planParam = searchParams.get("plan");
    const countryParam = searchParams.get("country");
    if (planParam) {
      const planMap: Record<string, string> = {
        free: "Free AI Receptionist",
        starter: "Starter Plan",
        growth: "Growth Plan",
        "ai-care": "AI Care (Flagship)",
        pro: "Pro Plan",
        enterprise: "Enterprise Plan",
      };
      const mapped = planMap[planParam.toLowerCase()] || planParam;
      setInterest(mapped);
      const regionText = countryParam === "US" ? "US Practice" : "Indian Clinic";
      if (!message) {
        setMessage(`Hello Curezy Team, I am interested in getting started with the ${mapped} for our ${regionText}. Please contact me with onboarding details.`);
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, "").length < 8) {
      toast.error("Please enter a valid phone number");
      return;
    }
    if (!message.trim()) {
      toast.error("Please enter your message or requirement");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Insert into Supabase database
      const { error: dbError } = await supabase.from("contact_submissions").insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          organization: organization.trim() || null,
          role: interest,
          service_interest: interest,
          message: message.trim(),
        },
      ]);

      if (dbError) {
        console.warn("Supabase contact_submissions insert warning:", dbError);
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
            _subject: `New Curezy Inquiry: ${name} (${interest})`,
            _template: "table",
            "Full Name": name.trim(),
            "Email Address": email.trim(),
            "Phone Number": phone.trim(),
            "Clinic / Organization": organization.trim() || "Not specified",
            "Interest / Service": interest,
            "Message / Requirement": message.trim(),
            "Submission Source": isStandalonePage ? "Contact Page" : "Homepage Contact Form",
            "Date": new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
          }),
        });
      } catch (emailErr) {
        console.warn("Email notification dispatch notification error:", emailErr);
      }

      setIsSubmitted(true);
      toast.success("Thank you! Your message has been sent to contact@curezy.in. Our team will reach out shortly.");
      setName("");
      setEmail("");
      setPhone("");
      setOrganization("");
      setMessage("");
    } catch (err: any) {
      console.error("Submission failed:", err);
      toast.error(err?.message || "Something went wrong. Please try again or email contact@curezy.in directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id={id} className={`py-24 md:py-36 relative ${className}`}>
      <div className="container">
        {/* Section Header matching landing page typography and eyebrow */}
        <div className="max-w-2xl mx-auto text-center mb-14 md:mb-16">
          <div className="eyebrow mb-4">Contact us</div>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.02] font-semibold tracking-[-0.03em] text-white">
            How can we help <span className="text-white/40">your clinic?</span>
          </h2>
          <p className="mt-5 text-white/60 text-lg leading-relaxed max-w-xl mx-auto">
            Have a question about our AI Care OS, WhatsApp automation, or Voice agents? Send us a message and our team will get back to you within 24 hours.
          </p>
        </div>

        {/* Card matching glass-dark-card container on the landing page */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto glass-dark-card rounded-[32px] md:rounded-[36px] p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-[0_24px_60px_-38px_rgba(15,23,42,0.4)]"
        >
          {/* Subtle top cyan ambient glow matching landing page sections */}
          <div
            className="pointer-events-none absolute -inset-px rounded-[36px] opacity-80"
            style={{
              background: "radial-gradient(ellipse at top, rgba(6,182,212,0.14) 0%, transparent 65%)",
            }}
          />

          <div className="relative z-10">
            {isSubmitted ? (
              <div className="py-12 px-4 text-center max-w-lg mx-auto">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 shadow-sm">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mb-3">
                  Inquiry Received
                </h3>
                <p className="text-white/60 mb-8 leading-relaxed text-sm md:text-base">
                  Thank you for reaching out. A confirmation has been sent to our team at{" "}
                  <span className="font-semibold text-white">contact@curezy.in</span>. We will review your clinic's requirements and get in touch with you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="btn-glass-pill"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-[12px] uppercase tracking-wider font-semibold text-white/70 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-cyan-500" />
                      Full Name <span className="text-cyan-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Dr. Sarah Sharma"
                      required
                      className="w-full rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/10 transition-all"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="space-y-2">
                    <label className="text-[12px] uppercase tracking-wider font-semibold text-white/70 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-cyan-500" />
                      Work / Personal Email <span className="text-cyan-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@cityclinic.com"
                      required
                      className="w-full rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/10 transition-all"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="text-[12px] uppercase tracking-wider font-semibold text-white/70 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-cyan-500" />
                      Phone Number <span className="text-cyan-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/10 transition-all"
                    />
                  </div>

                  {/* Clinic / Organization */}
                  <div className="space-y-2">
                    <label className="text-[12px] uppercase tracking-wider font-semibold text-white/70 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-cyan-500" />
                      Clinic / Hospital / Organization
                    </label>
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="Apex Care Polyclinic"
                      className="w-full rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/10 transition-all"
                    />
                  </div>
                </div>

                {/* Area of Interest */}
                <div className="space-y-2.5">
                  <label className="text-[12px] uppercase tracking-wider font-semibold text-white/70 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-cyan-500" />
                    What would you like to explore?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      "Free AI Receptionist",
                      "AI Care (Flagship)",
                      "Clinic AI OS",
                      "Voice AI Booking",
                      "WhatsApp Care",
                      "AI Medical Imaging",
                      "Pro / Enterprise",
                      "General Inquiry",
                    ].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setInterest(item)}
                        className={`px-3.5 py-2.5 rounded-full text-xs font-semibold transition-all text-center ${
                          interest === item
                            ? "bg-gradient-to-r from-cyan-500 to-sky-500 text-white shadow-md shadow-cyan-500/25 scale-[1.02]"
                            : "btn-glass-pill !py-2.5 !px-3.5 !font-medium text-white/70 hover:text-white"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-[12px] uppercase tracking-wider font-semibold text-white/70 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-cyan-500" />
                    Your Message or Requirement <span className="text-cyan-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your clinic volume, current workflow, or what you'd like to automate..."
                    required
                    className="w-full rounded-2xl border border-slate-200/80 bg-white/90 p-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/10 transition-all resize-none"
                  />
                </div>

                {/* Submit & Contact Assurance */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-white/[0.08]">
                  <p className="text-xs text-white/50">
                    Direct inquiries:{" "}
                    <a href="mailto:contact@curezy.in" className="text-cyan-600 font-semibold hover:underline">
                      contact@curezy.in
                    </a>{" "}
                    · Response in &lt; 24h
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-white-pill w-full sm:w-auto justify-center !px-8 !py-3.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Submit Inquiry
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
