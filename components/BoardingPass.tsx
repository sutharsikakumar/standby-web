"use client";

import { forwardRef } from "react";

type BoardingPassProps = {
  onOpen: () => void;
  revealed?: boolean;
};

// purely decorative barcode bars
const BARS = Array.from({ length: 22 });

const BoardingPass = forwardRef<HTMLButtonElement, BoardingPassProps>(
  function BoardingPass({ onOpen, revealed = false }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        className={`pass${revealed ? " is-revealed" : ""}`}
        onClick={onOpen}
        aria-label="Get your boarding pass — join the Standby waitlist"
      >
        <span className="pass-strip" aria-hidden="true" />

        <span className="pass-main">
          <span className="pass-row">
            <span className="pass-brand">Standby Air</span>
            <span className="pass-code">SB-027</span>
          </span>

          <span className="pass-headline">Get your boarding pass</span>

          <span className="pass-fields">
            <span>
              <span className="field-label">From</span>
              <span className="field-value">YOU</span>
            </span>
            <span>
              <span className="field-label">To</span>
              <span className="field-value">THEM</span>
            </span>
          </span>

          <span className="pass-cta" aria-hidden="true">
            Join waitlist
          </span>
        </span>

        <span className="pass-perf" aria-hidden="true" />

        <span className="pass-stub">
          <span>
            <span className="stub-label">Seat</span>
            <span className="stub-value">13A</span>
          </span>
          <span className="barcode" aria-hidden="true">
            {BARS.map((_, i) => (
              <span key={i} />
            ))}
          </span>
        </span>
      </button>
    );
  },
);

export default BoardingPass;
