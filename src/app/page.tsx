"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { Navbar } from "@/components/Navbar";

const heroVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Home() {
  return (
    <main className="canvas-wrapper">
      <Navbar hideActions />

      <section className="construction-hero" aria-labelledby="construction-title">
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <motion.h1 id="construction-title" className="construction-title" variants={fadeUp}>
            Whoops! We&apos;re still under construction.
          </motion.h1>

          <motion.p className="construction-subtitle" variants={fadeUp}>
            Something exciting is on the way — join the waitlist to be first through the door.
          </motion.p>

          <motion.div className="cta-row" variants={fadeUp}>
            <Link
              href="https://x.com/penumbratrade"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-waitlist-btn x-cta-btn"
              aria-label="Penumbra on X (Twitter)"
            >
              <svg viewBox="0 0 300 271" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" aria-hidden="true">
                <path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z" />
              </svg>
            </Link>
            <Link
              href="/waitlist"
              className="glass-waitlist-btn cta-join-btn"
              aria-label="Join Waitlist"
            >
              <span className="btn-text">Join Waitlist</span>
              <ArrowRight className="cta-arrow" size={18} aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <div className="bottom-flare" aria-hidden="true" />
    </main>
  );
}
