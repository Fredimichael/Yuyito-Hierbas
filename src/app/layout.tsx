import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { CLUB_NAME, CLUB_TAGLINE } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#05080e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: `${CLUB_NAME} | ${CLUB_TAGLINE}`,
  description: `Catálogo oficial de ${CLUB_NAME}. Blends e infusiones para mate, mates imperiales, bombillas de autor y accesorios artesanales.`,
  keywords: [CLUB_NAME, "yuyitos", "hierbas serranas", "mates", "bombillas", "blends para mate", "catálogo"],
  openGraph: {
    title: `${CLUB_NAME} - Catálogo Oficial`,
    description: CLUB_TAGLINE,
    type: "website",
    locale: "es_AR",
    siteName: CLUB_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${CLUB_NAME} - Catálogo Oficial`,
    description: CLUB_TAGLINE,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#05080e] text-white selection:bg-emerald-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
