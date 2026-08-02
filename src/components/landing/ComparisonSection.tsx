import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const rows = [
  { old: "Consultation ends at the clinic door", cur: "Continuous care over WhatsApp & voice" },
  { old: "Manual reminders and follow-up calls", cur: "AI agents that call, chat, and nudge 24/7" },
  { old: "Fragmented records across silos", cur: "Unified AI Health Twin for every patient" },
  { old: "Reactive, appointment-driven care", cur: "Predictive, always-on care journeys" },
  { old: "Staff drowning in scheduling & recovery", cur: "Automated triage, routing and rebooking" },
  { old: "No visibility into adherence or outcomes", cur: "Live dashboards on adherence & revenue" },
];

export default function ComparisonSection() {
  return (
    <section id="compare" className="py-24 md:py-36">
      <div className="container">
        <div className="mb-14 max-w-3xl">
          <div className="eyebrow mb-4">The shift</div>
          <h2 className="font-display text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.03em] text-slate-900">
            The old care stack vs.{" "}
            <span className="text-slate-400">the Curezy operating system.</span>
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          {/* Traditional */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-slate-50/80 p-7 md:p-9"
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="text-[11px] uppercase tracking-widest text-slate-500">
                Traditional care stack
              </div>
              <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] uppercase tracking-widest text-slate-500">
                Legacy
              </span>
            </div>
            <ul className="space-y-3.5">
              {rows.map((r, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-rose-100 text-rose-500">
                    <X className="h-3.5 w-3.5" />
                  </div>
                  <div className="text-sm text-slate-500 line-through decoration-rose-400/60 decoration-[1.5px]">
                    {r.old}
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Curezy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative overflow-hidden rounded-[28px] border border-cyan-200/70 bg-white p-7 shadow-[0_30px_70px_-40px_rgba(6,182,212,0.55)] md:p-9"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_60%_at_50%_0%,rgba(6,182,212,0.14),transparent_60%)]" />
            <div className="relative">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-slate-900">
                  <img src="/curezy logo.png" alt="" className="h-4 w-auto object-contain" />
                  Curezy AI Care OS
                </div>
                <span className="rounded-full border border-cyan-300 bg-cyan-50 px-2.5 py-1 text-[10px] uppercase tracking-widest text-cyan-700">
                  Live
                </span>
              </div>
              <ul className="space-y-3.5">
                {rows.map((r, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-cyan-500 to-sky-500 text-white shadow-[0_6px_16px_-6px_rgba(6,182,212,0.8)]">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <div className="text-sm font-medium text-slate-800">{r.cur}</div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
