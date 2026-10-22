import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", weight: ["400", "500", "600", "700", "800"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: { default: "Stoneshed Academy", template: "%s · Stoneshed Academy" },
  description: "Learn Money. Understand Markets. Invest with Clarity. A Stoneshed Asset Management initiative.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className={`${manrope.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
