import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "2048 RIFT",
  description: "A dimension-bending evolution of 2048",
  other: {
    "base:app_id": "69226fa37fdd1c481203659d",
    "talentapp:project_verification": "c8c41075ced6cd95de56ff773518f88382715d5ceb274a0aa4209c5d67bb0d237d4fc0a79dc8a4dc9326b2b00506e2c6bb2d1a7dc660c1a4c4852ad39ff3dda5",
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
