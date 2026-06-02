export function Navbar() {
  return (
    <header className="w-full">
      <nav className="flex items-center justify-between px-6 py-6 sm:px-10">
        {/* Logo placeholder — intentional, with a single red accent mark. */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-line">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
          </div>
          <span className="text-[11px] uppercase tracking-label text-ink-soft">
            Logo
          </span>
        </div>

        <a
          href="#waitlist"
          className="group relative text-sm text-ink transition-colors"
        >
          join waitlist
          <span
            aria-hidden
            className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 ease-out group-hover:w-full"
          />
        </a>
      </nav>
    </header>
  );
}
