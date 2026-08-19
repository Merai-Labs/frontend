"use client";

import React, { useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { WaitlistForm } from "@/components/WaitlistForm";

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
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    const input = document.querySelector<HTMLInputElement>(".email-input");
    input?.focus();
  };

  return (
    <main className="canvas-wrapper">
      {/* Top Navigation */}
      <Navbar onJoinClick={scrollToForm} />

      {/* Hero Section */}
      <section className="hero-content" aria-labelledby="hero-title">
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <motion.h1 id="hero-title" className="hero-title" variants={fadeUp}>
            Get Early
            <br />
            Access
          </motion.h1>

          <motion.p className="hero-subtitle" variants={fadeUp}>
            Be among the first to access Penumbra&apos;s lightning-fast execution
            with complete anonymity
          </motion.p>

          {/* Waitlist Signup Pill & Social Proof */}
          <motion.div
            ref={formRef}
            style={{ width: "100%" }}
            variants={fadeUp}
          >
            <WaitlistForm />
          </motion.div>
        </motion.div>
      </section>

      {/* Ambient bottom flare aura matching Paper visual glow */}
      <div className="bottom-flare" aria-hidden="true" />
    </main>
  );
}
