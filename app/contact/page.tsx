"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { generateGeneralWhatsAppLink } from "@/lib/whatsapp";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const link = generateGeneralWhatsAppLink(
    formData.name,
    formData.phone,
    formData.email,
    formData.city,
    formData.message
  );

  return (
    <div className="flex-grow flex flex-col justify-center px-6 lg:px-12 xl:px-16 max-w-6xl mx-auto w-full pt-28 pb-8 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 w-full items-center">
        
        {/* Left - Form */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_4px_30px_rgba(0,0,0,0.08)] border border-black/[0.04] order-2 lg:order-1"
        >
          <div className="flex justify-between items-end mb-8">
            <h3 className="text-2xl font-medium">Send us a Message</h3>
            <span className="text-xs font-semibold text-black/40 uppercase tracking-wider mb-1">(Optional)</span>
          </div>
          
          <div className="flex flex-col gap-5 mb-8">
            <input 
              type="text" 
              name="name" 
              placeholder="Name" 
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-surface border border-black/[0.04] px-5 py-4 rounded-xl outline-none focus:ring-2 focus:ring-brand/20 transition-all text-sm"
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-surface border border-black/[0.04] px-5 py-4 rounded-xl outline-none focus:ring-2 focus:ring-brand/20 transition-all text-sm"
            />
            <input 
              type="tel" 
              name="phone" 
              placeholder="Phone" 
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-surface border border-black/[0.04] px-5 py-4 rounded-xl outline-none focus:ring-2 focus:ring-brand/20 transition-all text-sm"
            />
            <input 
              type="text" 
              name="city" 
              placeholder="Preferred City" 
              value={formData.city}
              onChange={handleChange}
              className="w-full bg-surface border border-black/[0.04] px-5 py-4 rounded-xl outline-none focus:ring-2 focus:ring-brand/20 transition-all text-sm"
            />
            <textarea 
              name="message" 
              placeholder="Special Message" 
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-surface border border-black/[0.04] px-5 py-4 rounded-xl outline-none focus:ring-2 focus:ring-brand/20 transition-all text-sm resize-none"
            ></textarea>
          </div>

          <WhatsAppButton link={link} label="Send Message via WhatsApp" className="w-full py-4 text-lg" />
        </motion.div>

        {/* Right - Typography */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center order-1 lg:order-2"
        >
          <h1 className="text-5xl md:text-6xl font-medium tracking-tight leading-[1.1] mb-8">
            Let&apos;s Find<br />
            Your Next<br />
            Home
          </h1>
          <p className="text-black text-lg leading-relaxed mb-10 max-w-md">
            Whether you&apos;re looking for your first apartment or your next place to settle, we&apos;d love to hear from you. Have a question or need help finding the right apartment? Send us a message and we&apos;ll get back to you as soon as possible.
          </p>
          
          <div className="flex items-center gap-4">
            <WhatsAppButton link={link} label="Contact Us" className="px-8" />
            <span className="text-sm text-black">We&apos;ll reply on WhatsApp</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
