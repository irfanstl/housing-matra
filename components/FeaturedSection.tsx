"use client";

import { useRouter } from "next/navigation";
import { properties } from "@/data/properties";
import PropertyFilter from "./PropertyFilter";
import PropertyCard from "./PropertyCard";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FeaturedSection() {
  const router = useRouter();
  
  // Get 3 featured properties
  const featured = properties.slice(0, 3);

  const handleFilter = (filters: { city: string; rooms: string }) => {
    const params = new URLSearchParams();
    if (filters.city !== "All") params.set("city", filters.city);
    if (filters.rooms !== "Any") params.set("rooms", filters.rooms);
    
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="h-screen flex flex-col justify-center pt-24 pb-8 px-6 lg:px-12 xl:px-16 max-w-[1600px] mx-auto w-full snap-start relative z-20">
      
      {/* Centered Property Search Filter */}
      <div className="w-full max-w-4xl mx-auto mb-10 lg:mb-12">
        <PropertyFilter onFilter={handleFilter} />
      </div>

      <div className="w-full mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-2 mb-8">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-2 h-2 rounded-full bg-brand/50"></div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-dark">Featured Apartments</h2>
            <div className="w-2 h-2 rounded-full bg-brand/50"></div>
          </div>
          <p className="text-black/60 text-base md:text-lg font-medium max-w-lg">
            View some of our handpicked apartments available across Germany.
          </p>
        </div>

        {/* Featured Grid - 3 Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 w-full max-w-7xl mx-auto">
          {featured.map((prop, idx) => (
            <PropertyCard key={prop.code} property={prop} index={idx} />
          ))}
        </div>

        {/* View All Button */}
        <Link 
          href="/properties" 
          className="bg-card hover:bg-brand/10 text-brand font-medium px-8 py-4 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.25)] transition-all border border-brand/10 hover:border-brand/30 hover:scale-105"
        >
          View All Properties
        </Link>
      </div>
    </section>
  );
}
