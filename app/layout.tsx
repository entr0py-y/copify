import type { Metadata } from "next";
import { Inter, Space_Mono, Pacifico } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Copify | Instant Text Transfer",
  description: "Move text between devices instantly using a 5-character code. No login required.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Copify",
  },
};

export const viewport = {
  themeColor: "#000000",
};

import { PwaRegistry } from "@/components/PwaRegistry";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable} ${pacifico.variable}`}>
      <body>
        <PwaRegistry />
        <div className="atmospheric-bg"></div>
        {children}
      </body>
    </html>
  );
}
