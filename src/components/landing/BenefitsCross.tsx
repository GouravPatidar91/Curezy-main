import { motion } from "framer-motion";
import { DollarSign, Lightbulb, Hourglass, FastForward, Target, BarChart3 } from "lucide-react";

/* Knotch-style benefit tile — light glass card, cyan icon badge, bold slate title,
   muted continuation on the next line. */
const Tile = ({
  icon: Icon,
  title,
  desc,
  delay = 0,
  className = "",
}: {
  icon: any;
  title: string;
  desc: string;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`group relative h-full overflow-hidden rounded-[22px] border border-slate-200/80 bg-white/80 p-5 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-cyan-300/70 hover:shadow-[0_24px_60px_-28px_rgba(6,182,212,0.45)] ${className}`}
  >
    {/* soft top glow */}
    <div className="pointer-events-none absolute inset-x-0 -top-16 h-32 bg-[radial-gradient(closest-side,rgba(6,182,212,0.16),transparent_70%)]" />

    {/* icon badge */}
    <div className="relative grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-cyan-500 to-sky-500 shadow-[0_8px_20px_-8px_rgba(6,182,212,0.8)]">
      <Icon className="h-4 w-4 text-white" strokeWidth={2} />
    </div>

    <div className="mt-5">
      <div className="font-display text-[17px] font-semibold leading-tight tracking-[-0.01em] text-slate-900">
        {title}
      </div>
      <div className="mt-1 font-display text-[17px] font-semibold leading-tight tracking-[-0.01em] text-slate-400">
        {desc}
      </div>
    </div>
  </motion.div>
);

/* Center logo tile — deep navy square with a soft cyan glow and the brand mark centered. */
const CenterLogoTile = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.92 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className="relative h-full min-h-[220px]"
  >
    {/* outer glow */}
    <div className="pointer-events-none absolute -inset-6 rounded-[36px] bg-[radial-gradient(closest-side,rgba(6,182,212,0.28),transparent_70%)]" />
    <div className="relative h-full overflow-hidden rounded-[22px] border border-slate-900/10 bg-gradient-to-b from-[#0b1220] to-[#0a1a2b] shadow-[0_30px_70px_-30px_rgba(15,23,42,0.6)]">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_center,rgba(125,211,252,0.5)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(closest-side,black,transparent_75%)]" />
      <div className="relative grid h-full place-items-center p-6">
        <motion.div
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="grid h-16 w-16 place-items-center rounded-2xl bg-white/[0.06] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14),0_0_60px_-5px_rgba(6,182,212,0.7)]"
        >
          <img
            src="/curezy logo.png"
            alt="Curezy"
            className="h-8 w-8 object-contain"
          />
        </motion.div>
      </div>
    </div>
  </motion.div>
);

export default function BenefitsCross() {
  return (
    <section id="benefits" className="py-24 md:py-36">
      <div className="container">
        <div className="mb-14 max-w-2xl">
          <div className="eyebrow mb-4">Benefits</div>
          <h2 className="font-display text-4xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.03em] text-slate-900">
            What makes Curezy <span className="text-slate-400">better for your practice.</span>
          </h2>
        </div>

        {/* Knotch cross layout: 5-col grid, top row uses cols 2/3/4,
            bottom row uses all 5, center col 3 spans both rows. */}
        <div className="relative mx-auto max-w-6xl">
          {/* Mobile — simple stack */}
          <div className="grid gap-4 md:hidden">
            <Tile icon={DollarSign} title="Cost Efficient." desc="Reduce manual workload." />
            <Tile icon={Lightbulb} title="Better Insights." desc="Understand patient data quickly." delay={0.05} />
            <Tile icon={Hourglass} title="Time Saving." desc="Automate follow-ups instantly." delay={0.1} />
            <Tile icon={FastForward} title="Faster Consults." desc="Speed up your care flow." delay={0.15} />
            <Tile icon={Target} title="Higher Accuracy." desc="Minimize clinical errors." delay={0.2} />
            <Tile icon={BarChart3} title="Easy Scaling." desc="Grow without extra effort." delay={0.25} />
          </div>

          {/* Desktop — Knotch cross */}
          <div className="hidden md:grid md:grid-cols-5 md:grid-rows-2 md:gap-5">
            {/* Top row */}
            <div className="md:col-start-2 md:row-start-1">
              <Tile icon={DollarSign} title="Cost Efficient." desc="Reduce manual workload." />
            </div>
            <div className="md:col-start-3 md:row-span-2 md:row-start-1">
              <CenterLogoTile />
            </div>
            <div className="md:col-start-4 md:row-start-1">
              <Tile icon={Lightbulb} title="Better Insights." desc="Understand patient data quickly." delay={0.1} />
            </div>

            {/* Bottom row */}
            <div className="md:col-start-1 md:row-start-2">
              <Tile icon={Hourglass} title="Time Saving." desc="Automate follow-ups instantly." delay={0.15} />
            </div>
            <div className="md:col-start-2 md:row-start-2">
              <Tile icon={FastForward} title="Faster Consults." desc="Speed up your care flow." delay={0.2} />
            </div>
            <div className="md:col-start-4 md:row-start-2">
              <Tile icon={Target} title="Higher Accuracy." desc="Minimize clinical errors." delay={0.25} />
            </div>
            <div className="md:col-start-5 md:row-start-2">
              <Tile icon={BarChart3} title="Easy Scaling." desc="Grow without extra effort." delay={0.3} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
