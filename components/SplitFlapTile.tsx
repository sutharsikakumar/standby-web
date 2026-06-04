"use client";

import { useEffect, useMemo, useState } from "react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/**
 * Build an alphabetical "climb" that ends on the target letter, e.g. for
 * target "D" with 6 steps: Y Z A B C D — so the flap visibly cycles through
 * letters before settling, like a Solari board.
 */
function buildSequence(target: string, steps: number): string[] {
  const targetIdx = ALPHABET.indexOf(target.toUpperCase());
  if (targetIdx < 0) return [target];

  const seq: string[] = [];
  for (let i = steps; i >= 0; i--) {
    const idx = (targetIdx - i + ALPHABET.length * 2) % ALPHABET.length;
    seq.push(ALPHABET[idx]);
  }
  return seq;
}

type SplitFlapTileProps = {
  target: string;
  index: number;
};

const STEP_MS = 100; // time each letter is shown before flipping to the next

export default function SplitFlapTile({ target, index }: SplitFlapTileProps) {
  // Give each tile a slightly different number of flips so they don't all
  // land in lockstep — feels mechanical and organic.
  const sequence = useMemo(
    () => buildSequence(target, 6 + ((index * 2 + 3) % 4)),
    [target, index],
  );

  const [pos, setPos] = useState(0);
  const [flipKey, setFlipKey] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setReducedMotion(true);
      setPos(sequence.length - 1); // jump straight to the final letter
      return;
    }

    let active = true;
    let timer: ReturnType<typeof setTimeout>;

    const advance = (next: number) => {
      if (!active || next >= sequence.length) return;
      setPos(next);
      setFlipKey((k) => k + 1);
      timer = setTimeout(() => advance(next + 1), STEP_MS);
    };

    // staggered start per tile
    const start = setTimeout(() => advance(1), 200 + index * 90);

    return () => {
      active = false;
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, [sequence, index]);

  const current = sequence[pos];
  const previous = sequence[Math.max(0, pos - 1)];

  // Reduced motion: just show the final letter, no flipping leaves.
  if (reducedMotion) {
    return (
      <div className="flap-tile" aria-hidden="true">
        <div className="flap-half top">
          <span className="flap-glyph">{target}</span>
        </div>
        <div className="flap-half bottom">
          <span className="flap-glyph">{target}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flap-tile" aria-hidden="true">
      {/* static halves: top shows the NEW letter, bottom shows the OLD one */}
      <div className="flap-half top">
        <span className="flap-glyph">{current}</span>
      </div>
      <div className="flap-half bottom">
        <span className="flap-glyph">{previous}</span>
      </div>

      {/* flipping leaves — remounted on every step so the animation replays */}
      <div className="flap-leaf top" key={`t-${flipKey}`}>
        <span className="flap-glyph">{previous}</span>
      </div>
      <div className="flap-leaf bottom" key={`b-${flipKey}`}>
        <span className="flap-glyph">{current}</span>
      </div>
    </div>
  );
}
