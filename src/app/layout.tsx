import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "2048 RIFT",
  description: "A dimension-bending evolution of 2048",
  other: {
    "base:app_id": "69226fa37fdd1c481203659d",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-[#05070a] text-slate-100 selection:bg-fuchsia-500/30">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
