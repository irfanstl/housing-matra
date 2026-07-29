import React from "react";

export default function LogoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="32"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Bottom horizontal base line */}
      <path d="M 48 464 L 464 464" />
      {/* Left house vertical wall & roof peak */}
      <path d="M 80 464 V 240 L 210 140" />
      {/* Tall central house roof curve peak and right wall */}
      <path d="M 190 120 C 230 70 300 70 340 110 L 440 210 V 464" strokeWidth="32" />
      {/* Right chimney structure */}
      <path d="M 370 140 V 80 H 420 V 190" />
      {/* Inner head circle (person) */}
      <circle cx="265" cy="200" r="40" strokeWidth="32" />
      {/* Inner body portal arch (person/door) */}
      <path d="M 205 464 V 350 C 205 300 325 300 325 350 V 464" strokeWidth="32" />
    </svg>
  );
}
