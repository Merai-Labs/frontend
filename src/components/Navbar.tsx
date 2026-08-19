"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface NavbarProps {
  onJoinClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onJoinClick }) => {
  return (
    <motion.header
      className="navbar"
      role="banner"
      initial={{ opacity: 0, filter: "blur(10px)", y: -10 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <Link href="/" className="brand-logo" aria-label="Penumbra Home">
        <svg
          className="brand-icon"
          viewBox="0 0 667 664"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M160.497 17.1105C165.47 6.65863 176.013 0 187.587 0H399.864C422.459 0 436.944 24.0331 426.39 44.0121L327.084 232.012C321.889 241.847 311.668 248 300.546 248C222.963 248 170.008 248 98.1482 248C76.1022 248 61.5737 225.018 71.0458 205.11L160.497 17.1105Z" />
          <path d="M531.773 388.186C524.94 401.573 511.178 410 496.147 410H308.172C292.242 410 277.83 419.453 271.484 434.064L182.096 639.854C175.749 654.465 161.338 663.918 145.407 663.918H40.0381C11.8916 663.918 -7.45189 635.619 2.76811 609.394L126.692 291.394C132.678 276.033 147.476 265.918 163.962 265.918H311.633C326.328 265.918 339.839 257.861 346.825 244.932L427.3 95.986C434.285 83.0574 447.797 75 462.492 75H626.311C656.192 75 675.523 106.572 661.938 133.186L531.773 388.186Z" />
        </svg>
        <span className="brand-divider" aria-hidden="true" />
        <span className="brand-text">Penumbra</span>
      </Link>

      <nav className="nav-links-container" aria-label="Main Navigation">
        <Link
          href="https://x.com/penumbratrade"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
          aria-label="Penumbra on X (Twitter)"
        >
          <svg
            className="nav-x-icon"
            viewBox="0 0 300 271"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z" />
          </svg>
          <span className="sr-only">X (Twitter)</span>
        </Link>
        <button
          type="button"
          onClick={onJoinClick}
          className="glass-waitlist-btn"
          aria-label="Join Waitlist"
        >
          <span className="btn-text">Join Waitlist</span>
        </button>
      </nav>
    </motion.header>
  );
};
