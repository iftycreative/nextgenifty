import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "NextGen Ifty — Graphic Designer & AI-Powered Web Developer",
  description:
    "I design visual identities and build intelligent digital experiences with AI. Portfolio of NextGen Ifty.",
  keywords: [
    "NextGen Ifty",
    "Graphic Designer",
    "AI-Powered Web Developer",
    "Creative Studio",
    "Brand Identity",
    "Next.js Developer",
    "Portfolio",
  ],
  authors: [{ name: "NextGen Ifty" }],
  creator: "NextGen Ifty",
  openGraph: {
    title: "NextGen Ifty — Graphic Designer & AI-Powered Web Developer",
    description:
      "I design visual identities and build intelligent digital experiences with AI.",
    url: "https://nextgenifty.com",
    siteName: "NextGen Ifty",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextGen Ifty — Graphic Designer & AI-Powered Web Developer",
    description:
      "I design visual identities and build intelligent digital experiences with AI.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-background text-primary antialiased selection:bg-accent selection:text-white">
        <div className="noise-overlay" aria-hidden="true" />
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
