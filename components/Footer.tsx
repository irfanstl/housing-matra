"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoIcon from "@/components/LogoIcon";

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-body/70 group-hover:text-brand transition-colors">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-body/70 group-hover:text-brand transition-colors">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-body/70 group-hover:text-brand transition-colors">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Footer() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <footer className={`bg-white py-8 px-6 lg:px-12 xl:px-16 mt-auto border-t border-black/[0.04] shrink-0 shadow-[0_-2px_20px_rgba(0,0,0,0.04)] ${isHomePage ? "snap-end" : ""}`}>
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        {/* Left - Socials */}
        <div className="flex items-center gap-4">
          <Link href="#" className="group p-2.5 bg-surface rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:scale-110 transition-all flex items-center justify-center border border-black/[0.04]">
            <InstagramIcon />
          </Link>
          <Link href="#" className="group p-2.5 bg-surface rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:scale-110 transition-all flex items-center justify-center border border-black/[0.04]">
            <FacebookIcon />
          </Link>
          <Link href="#" className="group p-2.5 bg-surface rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:scale-110 transition-all flex items-center justify-center border border-black/[0.04]">
            <LinkedinIcon />
          </Link>
        </div>

        {/* Center - Logo */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 text-xl font-bold tracking-wider text-dark font-serif mb-1">
            <LogoIcon className="w-5 h-5 text-brand" />
            <span>Housing Matra</span>
          </div>
          <p className="text-xs text-body/75">Premium Apartments in India</p>
        </div>

        {/* Right - Support */}
        <div className="flex flex-col items-center md:items-end gap-1">
          <Link href="/contact" className="text-sm font-medium text-body/60 hover:text-brand transition-colors">
            Contact Us
          </Link>
          <p className="text-xs text-body/40">
            &copy; {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
