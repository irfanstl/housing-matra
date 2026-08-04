"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Property } from "@/data/properties";
import PropertyFilter from "./PropertyFilter";
import PropertyCard from "./PropertyCard";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function FeaturedSection() {
  const router = useRouter();
  
  const [featured, setFeatured] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/properties")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data: Property[]) => {
        // Filter to display unsold featured listings first
        const active = data.filter((p) => p.status !== "Sold").slice(0, 3);
        setFeatured(active.length > 0 ? active : data.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch featured properties:", err);
        setLoading(false);
      });
  }, []);

  const handleFilter = (filters: {
    search: string;
    state: string;
    city: string;
    propertyType: string;
    budget: string;
    rooms: string;
  }) => {
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.state !== "All") params.set("state", filters.state);
    if (filters.city !== "All") params.set("city", filters.city);
    if (filters.propertyType !== "All") params.set("propertyType", filters.propertyType);
    if (filters.budget !== "Any") params.set("budget", filters.budget);
    if (filters.rooms !== "Any") params.set("rooms", filters.rooms);
    
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="min-h-screen flex flex-col justify-center py-28 px-6 lg:px-12 xl:px-16 max-w-[1600px] mx-auto w-full snap-start relative z-20">
      
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
            View some of our handpicked apartments available across India.
          </p>
        </div>

        {/* Featured Grid - 3 Items */}
        {loading ? (
          <div className="py-20 w-full flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-brand animate-spin" />
            <p className="text-xs text-body/70 font-semibold uppercase tracking-wider">Loading featured apartments...</p>
          </div>
        ) : featured.length === 0 ? (
          <div className="py-20 w-full text-center">
            <p className="text-body/70">No properties available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 w-full max-w-7xl mx-auto">
            {featured.map((prop, idx) => (
              <PropertyCard key={prop.code} property={prop} index={idx} />
            ))}
          </div>
        )}

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
