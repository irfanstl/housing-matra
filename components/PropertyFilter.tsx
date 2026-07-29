"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { cities } from "@/data/cities";
import { motion, AnimatePresence } from "framer-motion";

interface FilterProps {
  onFilter: (filters: { city: string; rooms: string }) => void;
  compact?: boolean;
}

export default function PropertyFilter({ onFilter, compact = false }: FilterProps) {
  const [city, setCity] = useState("All");
  const [rooms, setRooms] = useState("Any");
  const [isCityOpen, setIsCityOpen] = useState(false);

  const handleSearch = () => {
    onFilter({ city, rooms });
  };

  return (
    <div className={`bg-card rounded-xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-4 border border-black/[0.04] ${compact ? "flex flex-col md:flex-row gap-4 items-end" : "grid grid-cols-1 md:grid-cols-3 gap-4"}`}>
      
      {/* City Custom Dropdown */}
      <div className={`flex flex-col relative ${compact ? "flex-1 w-full" : ""}`}>
        <label className="text-xs font-medium text-body/70 mb-2 px-2">City</label>
        
        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => setIsCityOpen(!isCityOpen)}
          className="bg-surface px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-brand/20 transition-all text-sm border border-black/[0.04] text-dark flex items-center justify-between w-full h-[46px]"
        >
          <span>{city === "All" ? "Select City" : city}</span>
          <ChevronDown className={`w-4 h-4 text-body transition-transform duration-300 ${isCityOpen ? "rotate-180" : ""}`} />
        </button>

        {/* Click Outside Overlay */}
        {isCityOpen && (
          <div 
            className="fixed inset-0 z-40 pointer-events-auto bg-transparent" 
            onClick={() => setIsCityOpen(false)}
          />
        )}

        {/* Dropdown Options List */}
        <AnimatePresence>
          {isCityOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.15 }}
              className="absolute top-[calc(100%+4px)] left-0 w-full bg-card border border-black/[0.06] rounded-md shadow-[0_4px_25px_rgba(0,0,0,0.08)] z-50 py-1 max-h-60 overflow-y-auto pointer-events-auto"
            >
              <div 
                onClick={() => { setCity("All"); setIsCityOpen(false); }}
                className={`px-4 py-2.5 text-sm hover:bg-surface transition-colors cursor-pointer text-dark ${
                  city === "All" ? "bg-brand/10 font-semibold text-brand" : ""
                }`}
              >
                Select City
              </div>
              {cities.map((c) => (
                <div
                  key={c}
                  onClick={() => { setCity(c); setIsCityOpen(false); }}
                  className={`px-4 py-2.5 text-sm hover:bg-surface transition-colors cursor-pointer text-dark ${
                    city === c ? "bg-brand/10 font-semibold text-brand" : ""
                  }`}
                >
                  {c}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Styled Option for Rooms (Pill Toggles) */}
      <div className={`flex flex-col ${compact ? "flex-1 w-full" : ""}`}>
        <label className="text-xs font-medium text-body/70 mb-2 px-2">Rooms</label>
        <div className="flex items-center gap-1 bg-surface p-1 rounded-md border border-black/[0.04] h-[46px] w-full">
          {["Any", "1", "2", "3", "4+"].map((r) => {
            const isSelected = rooms === r;
            return (
              <button
                key={r}
                type="button"
                onClick={() => setRooms(r)}
                className={`flex-1 text-center py-2.5 text-xs font-semibold rounded-sm transition-all duration-300 ${
                  isSelected 
                    ? "bg-brand text-white shadow-sm" 
                    : "text-body hover:text-dark hover:bg-black/[0.02]"
                }`}
              >
                {r === "Any" ? "Any" : r}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Action Button */}
      <div className={`flex items-end ${compact ? "" : "h-full"}`}>
        <button 
          onClick={handleSearch}
          className="w-full bg-accent-gold hover:bg-accent-gold-hover text-dark py-3 px-6 rounded-md font-medium transition-all flex items-center justify-center gap-2 h-[46px] shadow-[0_2px_12px_rgba(164,185,162,0.35)] hover:shadow-[0_4px_20px_rgba(164,185,162,0.45)] hover:scale-105"
        >
          <Search className="w-4 h-4 text-dark" />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
}
