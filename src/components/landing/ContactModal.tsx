import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Sparkles,
  User,
  Mail,
  Phone,
  Building2,
  MessageSquare,
  Send,
  CheckCircle2,
  X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface ContactModalEventDetail {
  planName?: string;
  doctors?: string;
  message?: string;
}

// Global helper to open the contact modal from any button or link
export function openContactModal(detail?: ContactModalEventDetail) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent<ContactModalEventDetail>("curezy:open-contact", {
        detail: detail || {},
      })
    );
  }
}

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [planName, setPlanName] = useState("");
  const [doctors, setDoctors] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Listen for global open events
  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<ContactModalEventDetail>;
      const detail = customEvent.detail || {};

      const currentPlan = detail.planName || "";
      setPlanName(currentPlan);
      setDoctors(detail.doctors || "");

      if (detail.message) {
        setMessage(detail.message);
      } else if (currentPlan) {
        setMessage(
          `Hi Curezy team, I'd like to get started with the ${currentPlan} for my clinic. Please contact me with onboarding details.`
        );
      } else {
        setMessage(
          "Hi Curezy team, I'd like to learn more about the AI Receptionist and WhatsApp automation for my clinic."
        );
      }

      setIsSubmitted(false);
      setIsOpen(true);
    };

    window.addEventListener("curezy:open-contact", handleOpen);
    return () => window.removeEventListener("curezy:open-contact", handleOpen);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid work email");
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, "").length < 8) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Save directly to Supabase database
      const { error: dbError } = await supabase
        .from("contact_submissions")
        .insert([
          {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            organization: organization.trim() || null,
            role: planName || "General Inquiry",
            service_interest: planName ? `${planName}` : "AI Clinic Operations",
            message: doctors
              ? `${message.trim()} [Scale: ${doctors}]`
              : message.trim(),
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
            _subject: `New Inquiry: ${name} - ${planName || "General Contact"}`,
            _template: "table",
            "Plan Selected": planName || "General Contact",
            "Doctors / Scale": doctors || "Not specified",
            "Full Name": name.trim(),
            "Email Address": email.trim(),
            "Phone Number": phone.trim(),
            "Clinic / Practice": organization.trim() || "Not specified",
            "Message / Requirements": message.trim(),
            Timestamp:
              new Date().toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
              }) + " IST",
          }),
        });
      } catch (err) {
        console.warn("Email alert error:", err);
      }

      setIsSubmitted(true);
      toast.success(
        "Thank you! Your request has been sent to our team at contact@curezy.in"
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md w-[92vw] p-6 sm:p-7 rounded-[28px] border border-cyan-500/25 bg-white/95 backdrop-blur-2xl text-slate-900 shadow-[0_25px_60px_-15px_rgba(6,182,212,0.25)] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-left space-y-1.5 mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold w-fit">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>{planName ? `${planName}` : "Quick Contact"}</span>
          </div>
          <DialogTitle className="font-display text-2xl font-bold tracking-tight text-slate-900">
            {planName ? `Get Started with ${planName}` : "Get in Touch with Curezy"}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-slate-500 font-medium">
            {planName
              ? "Confirm your details to activate your clinic's AI system."
              : "Tell us about your clinic. Our team will reach out within hours."}
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center mx-auto border border-cyan-200 shadow-sm">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-display text-xl font-bold text-slate-900">
              Request Received!
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xs mx-auto leading-relaxed">
              Thanks <strong className="text-slate-900">{name}</strong>! We've dispatched your details to{" "}
              <strong className="text-cyan-700">contact@curezy.in</strong>. A clinical onboarding specialist will contact you shortly.
            </p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="btn-white-pill !px-6 !py-2.5 !text-xs mt-3 font-semibold cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* If opened for a plan, display a clean pre-filled badge row */}
            {planName && (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">{planName}</span>
                  {doctors && (
                    <>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-500">{doctors}</span>
                    </>
                  )}
                </div>
                <span className="text-[11px] text-cyan-600 font-semibold bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-200/60">
                  Pre-selected
                </span>
              </div>
            )}

            {/* Name Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Dr. Rajesh Patel / Sarah Jenkins"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50/80 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/15 transition-all"
                />
              </div>
            </div>

            {/* Email & Phone in 2-column on sm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Work Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    placeholder="doctor@clinic.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50/80 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/15 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone / WhatsApp *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="tel"
                    placeholder="+91 / +1..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50/80 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/15 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Clinic Name (Optional) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Clinic / Hospital Name <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="e.g. Apex Health Polyclinic"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50/80 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/15 transition-all"
                />
              </div>
            </div>

            {/* Note / Requirements (Editable) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Notes & Requirements <span className="text-slate-400 font-normal">(Editable)</span>
              </label>
              <div className="relative">
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 text-xs bg-slate-50/80 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/15 transition-all resize-none leading-relaxed"
                />
              </div>
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-white-pill !w-full justify-center !py-3 !text-sm font-semibold shadow-md shadow-cyan-500/25 cursor-pointer disabled:opacity-50 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <span>{planName ? `Confirm & Request Setup` : `Send Message`}</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-center text-slate-400 pt-1">
              🔒 Your data is protected. Zero spam. We never share patient information.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
