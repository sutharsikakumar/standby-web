export function VideoPlaceholder() {
  return (
    <section className="w-full px-6 pt-24 sm:px-10 sm:pt-32">
      {/* Full-width video blank space — premium, with a single red cue. */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-line bg-white">
        {/* faint terminal-board ruling, kept barely visible */}
        <div
          aria-hidden
          className="absolute inset-0 [background-image:linear-gradient(to_right,var(--color-line)_1px,transparent_1px)] [background-size:12.5%_100%] opacity-40"
        />
        <div className="absolute left-6 top-6 flex items-center gap-2.5 sm:left-8 sm:top-8">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="text-[11px] uppercase tracking-label text-ink-soft">
            Video
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm uppercase tracking-label text-ink-soft">
            Coming soon
          </span>
        </div>
      </div>
    </section>
  );
}
