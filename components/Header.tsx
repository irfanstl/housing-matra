"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import LogoIcon from "@/components/LogoIcon";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!isHomePage) return;

    const scrollContainer = document.getElementById('home-scroll-container') || window;

    const handleScroll = () => {
      const scrollY = scrollContainer === window 
        ? window.scrollY 
        : (scrollContainer as HTMLElement).scrollTop;
        
      if (scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const scrolled = !isHomePage || isScrolled;

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Properties", href: "/properties" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <motion.header 
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 pointer-events-auto ${
        scrolled 
          ? "py-3 bg-white/75 backdrop-blur-md border-b border-black/[0.04] shadow-[0_2px_20px_rgba(0,0,0,0.03)]" 
          : "py-5 bg-white/60 backdrop-blur-md border-b border-black/[0.03]"
      }`}
    >
      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 xl:px-16 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl md:text-2xl font-bold tracking-wider text-dark font-serif hover:scale-105 transition-all">
          <LogoIcon className="w-6 h-6 md:w-7 md:h-7 text-brand animate-pulse" />
          <span>Housing Matra</span>
        </Link>

        {/* Navigation Menu */}
        <nav className="flex items-center gap-1 bg-brand/90 backdrop-blur-md border border-brand/40 p-1 rounded-full shadow-md">
          {navItems.map(({ name, href }) => {
            const isActive = href === "/" 
              ? pathname === "/" 
              : (pathname === href || pathname.startsWith(href));
              
            return (
              <Link
                key={href}
                href={href}
                className={`relative px-7 py-2 text-xs font-semibold tracking-wide transition-all duration-300 hover:scale-105 ${
                  isActive ? "text-brand" : "text-white hover:text-white/80"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-white rounded-full shadow-sm -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                {name}
              </Link>
            );
          })}
        </nav>

        {/* Right side placeholder spacer to keep navigation centered */}
        <div className="hidden md:block w-[180px]"></div>
      </div>
    </motion.header>
  );
}
