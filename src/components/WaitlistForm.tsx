"use client";

import React, { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";

type Toast = { message: string; kind: "error" | "info"; leaving: boolean };

export const WaitlistForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const showToast = (message: string, kind: Toast["kind"] = "error") => {
    if (toastTimerRef.current !== null) {
      clearTimeout(toastTimerRef.current);
    }
    setToast({ message, kind, leaving: false });
    toastTimerRef.current = setTimeout(() => {
      setToast((prev) => (prev === null ? null : { ...prev, leaving: true }));
      toastTimerRef.current = setTimeout(() => {
        setToast(null);
        toastTimerRef.current = null;
      }, 300);
    }, 3500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      inputRef.current?.focus();
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        setIsLoading(false);
        showToast("Something went wrong. Please try again.");
        return;
      }

      const data = (await res.json()) as { duplicate?: boolean };
      setIsLoading(false);

      if (data.duplicate) {
        showToast("You're already on the waitlist!", "info");
        return;
      }

      setIsSubmitted(true);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#094BF3", "#FFE500", "#E01E37", "#84DE49", "#FFFFFF"],
        });
      } catch (err) {
        // Fallback gracefully if canvas is unavailable
      }
    } catch {
      setIsLoading(false);
      showToast("Network error. Please try again.");
    }
  };

  return (
    <div className="waitlist-form-container">
      {isSubmitted ? (
        <div className="success-message" role="alert">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>You&apos;re on the list! We&apos;ll be in touch soon.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="waitlist-form">
          <input
            ref={inputRef}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@gmail.com"
            required
            className="email-input"
            aria-label="Email address for waitlist"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="submit-arrow-btn"
            aria-label="Submit email to join waitlist"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ animation: "spin 1s linear infinite" }}
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  strokeOpacity="0.25"
                  stroke="currentColor"
                />
                <path
                  d="M12 2a10 10 0 0 1 10 10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  transform="matrix(1 0 0 1 7 7)"
                  d="M0 0C0 0 10 0 10 0C10 0 10 10 10 10"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  transform="matrix(1 0 0 1 7 7)"
                  d="M0 10C0 10 10 0 10 0"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </form>
      )}

      {/* Social Proof Avatar Stack */}
      <div className="social-proof-badge">
        <div className="avatar-stack" aria-hidden="true">
          <div className="avatar-circle avatar-red" />
          <div className="avatar-circle avatar-yellow" />
          <div className="avatar-circle avatar-coral" />
          <div className="avatar-circle avatar-green" />
        </div>
        <span className="social-proof-text">
          Join others on the waitlist
        </span>
      </div>

      {toast && (
        <div
          className={`toast toast-${toast.kind}${toast.leaving ? " toast-leaving" : ""}`}
          role="alert"
          aria-live="polite"
        >
          {toast.message}
        </div>
      )}
    </div>
  );
};
