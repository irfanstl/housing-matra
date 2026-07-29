"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const steps = [
  { num: "Step 1", title: "Choose City", delay: 0 },
  { num: "Step 2", title: "Browse Apartments", delay: 0.2 },
  { num: "Step 3", title: "Contact via WhatsApp", delay: 0.4 },
  { num: "Step 4", title: "Schedule Your Visit", delay: 0.6 },
];

export default function ProcessSection() {
  return (
    <section className="h-screen flex items-center justify-center py-20 px-6 lg:px-12 xl:px-16 max-w-[1600px] mx-auto w-full snap-start">
      <div className="bg-card rounded-2xl shadow-[0_2px_30px_rgba(0,0,0,0.05)] border border-black/[0.04] w-full flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          
          {/* Left - Overlapping Images */}
          <div className="relative w-full aspect-square max-w-md lg:max-w-lg mx-auto lg:ml-auto lg:mr-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="absolute top-0 left-0 w-[65%] h-[65%] rounded-full overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.15)] border-8 border-white z-10"
            >
              <Image 
                src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800"
                alt="Cozy Living Room"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute bottom-0 right-0 w-[60%] h-[60%] rounded-full overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] border-8 border-white z-20"
            >
              <Image 
                src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800"
                alt="Modern Bedroom"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Right - Text and Process */}
          <div className="flex flex-col">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight leading-tight mb-6">
              We Do More Than<br />
              Just Rent Apartments.<br />
              We Create Homes.
            </h2>
            <p className="text-body/80 text-lg mb-12 max-w-lg font-light">
              Every apartment is carefully selected, professionally maintained, and prepared with comfort in mind. Our goal is to make renting simple, transparent, and personal from the very first conversation.
            </p>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute top-4 left-0 w-full h-[2px] bg-brand/15 hidden md:block"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {steps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: step.delay }}
                    className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0 relative z-10"
                  >
                    <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center mb-0 md:mb-4 shrink-0 shadow-[0_2px_10px_rgba(107,125,108,0.35)]">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-[10px] text-brand font-medium mb-1 uppercase tracking-wider">{step.num}</p>
                      <p className="text-sm font-medium text-dark leading-tight">{step.title}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
