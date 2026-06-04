"use client";

import { useState } from "react";
import SplitFlapLogo from "@/components/SplitFlapLogo";
import BoardingPass from "@/components/BoardingPass";
import WaitlistModal from "@/components/WaitlistModal";

export default function StandbyLandingPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-12 px-6 py-20 text-center">
      <SplitFlapLogo />

      <div
        className="fade-in flex max-w-[520px] flex-col gap-5"
        style={{ animationDelay: "2.1s" }}
      >
        <p className="text-[17px] font-medium leading-[1.3] text-[var(--pitch-black)] sm:text-[21px]">
          Airports are the world&apos;s greatest hub of talent. Millions of
          brilliant people. Researchers, founders, future collaborators, packed
          into the same terminals, staring at their phones.
        </p>
        <p className="text-[17px] font-medium leading-[1.3] text-[var(--pitch-black)] sm:text-[21px]">
          We build the infrastructure to change that. The right introduction at
          the right moment can change everything. Manufacture your own luck.
        </p>
      </div>

      <div className="fade-in" style={{ animationDelay: "2.4s" }}>
        <BoardingPass onOpen={() => setModalOpen(true)} />
      </div>

      <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
