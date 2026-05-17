"use client";

import dynamic from "next/dynamic";

const GameUI = dynamic(() => import("@/components/GameUI"), { ssr: false });

export default function Home() {
  return (
    <main className="flex-1 w-full bg-[#05070a] overflow-hidden fixed inset-0">
      <GameUI />
    </main>
  );
}
