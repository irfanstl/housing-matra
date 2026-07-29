"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Shield, Users, MessageSquare, Home, Heart, UserCheck } from "lucide-react";

const features = [
  {
    icon: <Shield className="w-6 h-6 text-brand" />,
    title: "Complete Maintenance",
    desc: "Total commitment to the upkeep of your flat.",
    bg: "bg-card"
  },
  {
    icon: <CheckCircle2 className="w-6 h-6 text-brand" />,
    title: "Full Transparency",
    desc: "Taking care of your interests and money.",
    bg: "bg-card"
  },
  {
    icon: <Users className="w-6 h-6 text-brand" />,
    title: "Careful Selection",
    desc: "We only choose the most reliable tenants.",
    bg: "bg-card"
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-brand" />,
    title: "Quick Response",
    desc: "Highly attentive, personalized approach.",
    bg: "bg-card"
  }
];

const aboutBlocks = [
  {
    icon: <Home className="w-5 h-5 text-brand" />,
    title: "We keep it personal.",
    desc: "Finding the right home should feel easy and stress-free."
  },
  {
    icon: <Heart className="w-5 h-5 text-brand" />,
    title: "Homes we're proud of.",
    desc: "Carefully selected, well-maintained apartments you'll love."
  },
  {
    icon: <UserCheck className="w-5 h-5 text-brand" />,
    title: "Here for you.",
    desc: "From your first message to move-in and beyond."
  }
];

const DotPattern = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="2" cy="2" r="2" fill="currentColor"/>
    <circle cx="14" cy="2" r="2" fill="currentColor"/>
    <circle cx="26" cy="2" r="2" fill="currentColor"/>
    <circle cx="38" cy="2" r="2" fill="currentColor"/>
    <circle cx="2" cy="14" r="2" fill="currentColor"/>
    <circle cx="14" cy="14" r="2" fill="currentColor"/>
    <circle cx="26" cy="14" r="2" fill="currentColor"/>
    <circle cx="38" cy="14" r="2" fill="currentColor"/>
    <circle cx="2" cy="26" r="2" fill="currentColor"/>
    <circle cx="14" cy="26" r="2" fill="currentColor"/>
    <circle cx="26" cy="26" r="2" fill="currentColor"/>
    <circle cx="38" cy="26" r="2" fill="currentColor"/>
    <circle cx="2" cy="38" r="2" fill="currentColor"/>
    <circle cx="14" cy="38" r="2" fill="currentColor"/>
    <circle cx="26" cy="38" r="2" fill="currentColor"/>
    <circle cx="38" cy="38" r="2" fill="currentColor"/>
  </svg>
);

export default function AboutSection() {
  return (
    <section className="flex flex-col items-center justify-center w-full snap-start relative z-10 h-[calc(100vh-130px)] bg-page overflow-hidden">
      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 xl:px-16 flex flex-col justify-center h-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-0 lg:gap-8 items-center w-full">
        
        {/* Left - About Us */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-semibold text-brand uppercase tracking-[0.2em]">About Us</span>
            <div className="w-10 h-[1.5px] bg-brand/40"></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-10">
            About Us <span className="text-brand/30 text-2xl">✦</span>
          </h2>

          <div className="flex flex-col gap-7">
            {aboutBlocks.map((block, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                  {block.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-dark text-[15px] mb-1">{block.title}</h4>
                  <p className="text-sm text-body/80 leading-relaxed">{block.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Center - Decorative Overlapping Circles with Arcs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-[340px] h-[460px] hidden lg:block lg:-ml-16 lg:mr-20"
        >
          {/* Sparkles */}
          <span className="absolute top-1/4 -left-8 text-brand/30 text-2xl">✦</span>
          <span className="absolute bottom-1/3 -right-2 text-brand/30 text-xl">✦</span>

          {/* Dot Patterns */}
          <DotPattern className="absolute top-0 right-10 text-brand/15 w-16 h-16 z-0" />
          <DotPattern className="absolute bottom-4 left-0 text-brand/15 w-16 h-16 z-0" />

          {/* Top Group (Large) */}
          <div className="absolute top-4 left-4 w-[280px] h-[280px]">
            {/* Background Circle */}
            <div 
              className="absolute inset-0 rounded-full z-0"
              style={{ 
                background: 'linear-gradient(135deg, rgba(194,89,63,0.12) 0%, rgba(194,89,63,0.05) 100%)',
                border: '2px solid rgba(194,89,63,0.08)'
              }}
            ></div>
            {/* Image Circle (Centered: 280-210 = 70 / 2 = 35) */}
            <div className="absolute top-[35px] left-[35px] w-[210px] h-[210px] rounded-full overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.12)] border-[5px] border-white z-10">
              <Image 
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600"
                alt="Elegant Living Room"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Bottom Group (Small) */}
          <div className="absolute bottom-4 right-4 w-[240px] h-[240px] z-20">
            {/* Background Circle */}
            <div 
              className="absolute inset-0 rounded-full z-0"
              style={{ 
                background: 'linear-gradient(135deg, rgba(194,89,63,0.10) 0%, rgba(194,89,63,0.03) 100%)',
                border: '2px solid rgba(194,89,63,0.06)'
              }}
            ></div>
            {/* Image Circle (Centered: 240-180 = 60 / 2 = 30) */}
            <div className="absolute top-[30px] left-[30px] w-[180px] h-[180px] rounded-full overflow-hidden shadow-[0_6px_30px_rgba(0,0,0,0.10)] border-[5px] border-white z-20">
              <Image 
                src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=600"
                alt="Modern Interior"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Right - Features Grid & Contact */}
        <div className="flex w-full relative">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 w-full relative">
            {features.map((feat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`${feat.bg} p-6 lg:p-7 rounded-xl flex flex-col items-start shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_30px_rgba(0,0,0,0.08)] transition-all duration-300 border border-black/[0.04]`}
              >
                <div className="bg-surface p-3 rounded-md shadow-sm mb-4 border border-black/[0.03]">
                  {feat.icon}
                </div>
                <h4 className="font-medium text-dark mb-2">{feat.title}</h4>
                <p className="text-sm text-body/85 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}

            {/* Absolute Centered Contact Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute inset-0 m-auto flex items-center justify-center pointer-events-none"
            >
              <Link 
                href="/contact"
                className="pointer-events-auto bg-brand hover:bg-brand-hover text-white text-base font-medium px-8 py-4 rounded-xl shadow-[0_8px_30px_rgba(107,125,108,0.35)] hover:shadow-[0_12px_40px_rgba(107,125,108,0.45)] hover:scale-105 transition-all flex items-center gap-2 border-4 border-white"
              >
                Contact Us <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

        </div>

      </div>
      </div>
    </section>
  );
}
