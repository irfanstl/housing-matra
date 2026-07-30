"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Property } from "@/data/properties";

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export default function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const isSold = property.status === "Sold";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="group flex flex-col bg-card rounded-3xl p-3 shadow-[0_2px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:scale-[1.03] transition-all duration-500 border border-black/[0.04]"
    >
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-3">
        <Image
          src={property.gallery[0]}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-xl text-[10px] uppercase font-bold tracking-wider text-dark shadow-sm z-10">
          {property.code}
        </div>

        {property.status && (
          <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-xl text-[10px] uppercase font-bold tracking-wider shadow-sm z-10 ${
            property.status === "New Listing" ? "bg-accent-gold text-dark" : "bg-accent-blue text-white"
          }`}>
            {property.status}
          </div>
        )}
      </div>

      <div className="px-2 flex flex-col flex-grow">
        <h3 className="font-semibold text-base mb-1 text-dark font-serif tracking-wide">{property.city}</h3>
        <p className="text-body/70 text-xs mb-3 font-medium">
          {property.rooms} BHK • {property.area} sq.ft
        </p>

        <div className="mt-auto">
          {isSold ? (
            <Link
              href={`/property/${property.code.toLowerCase()}`}
              className="block w-full py-2.5 text-center bg-accent-blue/10 text-accent-blue hover:bg-accent-blue hover:text-white rounded-2xl text-sm font-semibold transition-all duration-300 hover:scale-105"
            >
              Recently Sold
            </Link>
          ) : (
            <Link
              href={`/property/${property.code.toLowerCase()}`}
              className="block w-full py-2.5 text-center bg-brand/10 text-brand hover:bg-brand hover:text-white rounded-2xl text-sm font-semibold transition-all duration-300 hover:scale-105"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
