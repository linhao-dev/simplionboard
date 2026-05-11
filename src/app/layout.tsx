import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SimpliOnboard — Client Onboarding Made Simple",
  description: "Branded client intake forms, e-signatures, and payment collection for freelancers. Like HoneyBook but simpler and half the price.",
  keywords: ["client onboarding", "freelance tool", "HoneyBook alternative", "intake form"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full">{children}<Toaster position="top-right" /></body>
    </html>
  );
}
