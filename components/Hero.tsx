"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, MessageCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="h-screen w-full snap-start relative overflow-hidden flex flex-col items-center justify-center text-center px-6 lg:px-12 xl:px-16">
      {/* Full-Screen Background Image */}
      <Image 
        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000"
        alt="Modern Spatial Living in India"
        fill
        priority
        className="object-cover z-0"
      />
      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/70 z-10"></div>
      
      {/* Hero Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-20 text-white flex flex-col items-center max-w-4xl"
      >
        <h1 className="title text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight mb-6 text-shadow-sm leading-[1.1] font-serif">
          Secure Your Perfect<br />Living Space in India
        </h1>
        
        <p className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed mb-10 max-w-2xl font-light">
          Unlock access to verified, privately owned apartments that meet the highest standards of comfort and care. We are dedicated to making your apartment hunt straightforward, honest, and entirely stress-free.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
          <Link 
            href="/properties"
            className="bg-brand hover:bg-brand-hover text-white text-base md:text-lg font-medium px-8 py-4 rounded-xl shadow-[0_8px_30px_rgba(107,125,108,0.35)] hover:shadow-[0_12px_40px_rgba(107,125,108,0.45)] hover:scale-105 transition-all flex items-center gap-2 border-2 border-brand"
          >
            Explore Apartments <ArrowRight className="w-5 h-5" />
          </Link>
          
          <Link 
            href="/contact"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 hover:border-white/50 text-base md:text-lg font-medium px-8 py-4 rounded-xl transition-all flex items-center gap-2 hover:scale-105"
          >
            Contact Us <MessageCircle className="w-5 h-5" />
          </Link>
        </div>
      </motion.div>

      {/* Floating Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors cursor-pointer"
        onClick={() => {
          const container = document.getElementById("home-scroll-container");
          if (container) {
            container.scrollTo({ top: window.innerHeight, behavior: "smooth" });
          }
        }}
      >
        <span className="text-xs uppercase tracking-widest font-semibold">Scroll Down</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
