import { motion } from "framer-motion";
import { MessageCircle, PhoneCall, Scan, TrendingUp, Check, ArrowUpRight, Activity } from "lucide-react";

const metrics = [
  { v: "175+", k: "Patients onboarded" },
  { v: "30%", k: "Fewer no-shows" },
  { v: "4 hrs", k: "Saved per staff / day" },
  { v: "₹4.5L", k: "Revenue recovered / mo" },
];

export default function CaseStudy() {
  return (
    <section id="case" className="py-24 md:py-36">
      <div className="container">
        <div className="max-w-3xl mb-14">
          <div className="eyebrow mb-4">Case study</div>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.02] font-semibold tracking-[-0.03em] text-slate-900">
            How clinics use Curezy to <span className="text-slate-400">scale care without scaling headcount.</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/80 p-6 md:p-10 shadow-[0_24px_60px_-38px_rgba(15,23,42,0.4)] backdrop-blur-xl grid lg:grid-cols-[1.1fr_1.2fr] gap-8 items-center"
        >
          {/* subtle top glow */}
          <div className="pointer-events-none absolute -inset-px rounded-[32px] bg-[radial-gradient(120%_60%_at_50%_0%,rgba(6,182,212,0.12),transparent_60%)]" />

          {/* Left Column: Quote & Metrics */}
          <div className="relative z-10">
            <div className="text-slate-500 text-sm font-medium mb-3">A 3-doctor OPD clinic · Bengaluru</div>
            <p className="text-slate-900 text-xl md:text-2xl leading-snug font-display font-medium">
              "We replaced two spreadsheets, one call center, and a lot of chasing —
              with Curezy. Our follow-up rate doubled in six weeks."
            </p>
            <div className="mt-4 text-slate-500 text-sm font-medium">— Practice Manager, verified partner clinic</div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {metrics.map((m, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-slate-50/90 border border-slate-200 p-4 transition-all hover:border-cyan-300 hover:bg-white"
                >
                  <div className="font-display text-3xl font-semibold text-slate-900">{m.v}</div>
                  <div className="text-slate-500 text-xs mt-1 font-medium">{m.k}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 4 Branded Clinical Workflow & Outcome Cards */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Card 1: WhatsApp Patient Care */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-emerald-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-100 text-emerald-600">
                      <MessageCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-800">WhatsApp Nudges</div>
                      <div className="text-[10px] text-slate-400">Automated Follow-up</div>
                    </div>
                  </div>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>

                <div className="space-y-2 rounded-xl bg-slate-50 p-2.5 text-[11px] border border-slate-100">
                  <div className="rounded-lg bg-white p-2 text-slate-700 shadow-xs border border-slate-200/60">
                    "Hi Rohit, did you take your morning BP dose?"
                  </div>
                  <div className="ml-auto w-fit rounded-lg bg-emerald-50 px-2 py-1 text-emerald-800 font-medium border border-emerald-200/60">
                    "Yes, BP: 122/80"
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-[10px] text-slate-500">
                <span className="font-semibold text-emerald-600">+94% Adherence</span>
                <span className="text-slate-400">Logged to EMR</span>
              </div>
            </motion.div>

            {/* Card 2: AI Voice Follow-Up (Staggered) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-cyan-300 sm:mt-6 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="grid h-7 w-7 place-items-center rounded-lg bg-cyan-100 text-cyan-600">
                      <PhoneCall className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-800">Voice Care Agent</div>
                      <div className="text-[10px] text-slate-400">Post-Op Recovery</div>
                    </div>
                  </div>
                  <span className="rounded-full bg-cyan-50 px-2 py-0.5 text-[10px] font-medium text-cyan-700 border border-cyan-200">
                    1m 24s
                  </span>
                </div>

                <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-500" />
                    <span>AI Voice: Ravi</span>
                  </div>
                  <div className="text-[11px] text-slate-700 leading-snug">
                    "Confirmed symptom-free. Scheduled review visit for Friday 10:30 AM."
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-[10px] text-slate-500">
                <span className="font-semibold text-cyan-600">0 Staff Min Spent</span>
                <span className="flex items-center gap-0.5 text-slate-400"><Check className="h-3 w-3 text-emerald-500" /> Confirmed</span>
              </div>
            </motion.div>

            {/* Card 3: AI Medical Imaging & VISTA-3D */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-purple-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="grid h-7 w-7 place-items-center rounded-lg bg-purple-100 text-purple-600">
                      <Scan className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-800">AI Medical Imaging</div>
                      <div className="text-[10px] text-slate-400">VISTA-3D Tri-Planar</div>
                    </div>
                  </div>
                  <span className="rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-medium text-purple-700 border border-purple-200">
                    DICOM
                  </span>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-950 relative h-20">
                  <img
                    src="/imaging/axial_ct_segmentation.jpg"
                    alt="CT Scan"
                    className="h-full w-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2">
                    <div className="text-[10px] text-cyan-300 font-mono flex items-center gap-1">
                      <Activity className="h-3 w-3" />
                      <span>99.4% Organ Mask Match</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-[10px] text-slate-500">
                <span className="font-semibold text-purple-600">128+ Classes</span>
                <span className="text-slate-400">Sub-second Recon</span>
              </div>
            </motion.div>

            {/* Card 4: Retention & Practice ROI (Staggered) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-amber-300 sm:mt-6 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="grid h-7 w-7 place-items-center rounded-lg bg-amber-100 text-amber-600">
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-800">Practice ROI</div>
                      <div className="text-[10px] text-slate-400">Monthly Performance</div>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                </div>

                <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Follow-up show rate</span>
                    <span className="font-semibold text-emerald-600">+112%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Recovered revenue</span>
                    <span className="font-semibold text-slate-700">₹4.5 Lakhs/mo</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-[10px] text-slate-500">
                <span className="font-semibold text-slate-800">142 Patients Rebooked</span>
                <span className="text-emerald-600 font-medium">Zero Leakage</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

