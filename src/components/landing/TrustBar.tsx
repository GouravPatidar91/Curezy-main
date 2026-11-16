const items = ["Clinics", "Hospitals", "Pharmacies", "Diagnostics", "Insurers", "Providers", "Care Teams"];

export default function TrustBar() {
  return (
    <section className="py-16 border-y border-white/[0.06]">
      <div className="container">
        <p className="text-center text-[10px] uppercase tracking-[0.24em] text-white/40 mb-8">
          Built for the entire healthcare ecosystem
        </p>
        <div className="overflow-hidden mask-fade">
          <div className="flex gap-16 animate-marquee whitespace-nowrap">
            {[...items, ...items, ...items].map((it, i) => (
              <div key={i} className="text-2xl md:text-3xl font-display font-medium text-white/25">
                {it}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
          {/* Backed by ElevenLabs */}
          <div className="flex items-center gap-3">
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">Backed by</p>
            <a
              href="https://elevenlabs.io/startup-grants"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ElevenLabs Startup Grants"
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              <img
                src="/elevenlabs-grants.webp"
                alt="ElevenLabs Grants"
                className="w-[160px] h-auto object-contain invert"
              />
            </a>
          </div>

          <div className="hidden sm:block w-px h-5 bg-white/[0.1]" />

          {/* Powered by */}
          <div className="flex items-center gap-3">
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">Powered by</p>
            <a
              href="https://www.sarvam.ai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Sarvam AI"
              className="opacity-85 hover:opacity-100 transition-opacity flex items-center"
            >
              <img
                src="/wordmark-dark.png"
                alt="Sarvam AI"
                className="h-6 w-auto object-contain invert"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
