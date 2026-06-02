export function ProductDemoPlaceholder() {
  return (
    <section className="w-full px-6 pt-24 sm:px-10 sm:pt-32">
      <div className="flex items-center justify-center">
        {/* App preview — a dark card to read as a real product surface,
            not an empty placeholder. Red appears once, as a status dot. */}
        <div className="w-full max-w-sm rounded-[28px] bg-ink p-7 text-paper shadow-[0_40px_80px_-32px_rgba(10,10,10,0.45)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-label text-paper/60">
              Standby
            </span>
            <span className="flex items-center gap-2">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-accent"
              />
              <span className="text-xs font-medium uppercase tracking-label text-paper/60">
                Live
              </span>
            </span>
          </div>

          <p className="mt-12 text-4xl font-bold tracking-tight">
            JFK <span className="text-paper/40">→</span> SFO
          </p>

          <div className="mt-12 border-t border-paper/15 pt-6">
            <div className="flex items-baseline justify-between">
              <span className="text-base font-medium">1 match nearby</span>
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-accent"
              />
            </div>
            <p className="mt-2 text-sm text-paper/55">one reason to say yes</p>
          </div>

          <div className="mt-10 flex items-center justify-between text-xs text-paper/45">
            <span>Gate 22</span>
            <span>Boards in 41m</span>
          </div>
        </div>
      </div>

      <p className="mt-8 text-center text-xs uppercase tracking-label text-ink-soft">
        Product demo coming soon
      </p>
    </section>
  );
}
