import type { Metadata } from "next";
import { Inter, Instrument_Serif, Poppins } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  display: "swap",
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-instrument-serif",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-poppins",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://penumbratrade.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Penumbra — Get Early Access",
  description: "Join the Penumbra waitlist today. Get exclusive early access to the next generation platform.",
  openGraph: {
    title: "Penumbra — Private OTC Trading",
    description: "Lightning-fast execution with complete anonymity. Join the waitlist for early access.",
    type: "website",
    url: "/",
    siteName: "Penumbra",
    images: [
      {
        url: `${siteUrl}/penumbra-thumbnail.png`,
        width: 2560,
        height: 1664,
        alt: "Penumbra",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Penumbra — Private OTC Trading",
    description: "Lightning-fast execution with complete anonymity. Join the waitlist for early access.",
    images: [`${siteUrl}/penumbra-thumbnail.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} ${poppins.variable}`}>
      <body className={inter.className}>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
