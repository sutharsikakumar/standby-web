import { WaitlistForm } from "@/components/WaitlistForm";

export function Hero() {
  return (
    <section id="top" className="w-full px-6 pt-16 sm:px-10 sm:pt-24">
      <div className="flex items-center gap-2.5">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
        <span className="text-[11px] uppercase tracking-label text-ink-soft">
          Standby
        </span>
      </div>

      {/* Full-bleed headline — spans the whole screen width. */}
      <h1 className="mt-10 w-full text-balance text-[clamp(2.75rem,8.5vw,11rem)] font-bold leading-[0.95] tracking-tight text-ink">
        Meet someone before boarding<span className="text-accent">.</span>
      </h1>

      <div id="waitlist" className="mt-12 max-w-md scroll-mt-24">
        <WaitlistForm />
      </div>
    </section>
  );
}
