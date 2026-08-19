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

export const metadata: Metadata = {
  title: "Penumbra — Get Early Access",
  description: "Join the Penumbra waitlist today. Get exclusive early access to the next generation platform.",
  openGraph: {
    title: "Penumbra — Get Early Access",
    description: "Join the Penumbra waitlist today.",
    type: "website",
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
