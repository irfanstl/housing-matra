"use client";

import { useState, useEffect } from "react";
import { Search, ChevronDown, SlidersHorizontal, RotateCcw } from "lucide-react";
import { cities } from "@/data/cities";
import { motion, AnimatePresence } from "framer-motion";

interface FilterProps {
  onFilter: (filters: {
    search: string;
    state: string;
    city: string;
    propertyType: string;
    budget: string;
    rooms: string;
  }) => void;
  initialFilters?: {
    search?: string;
    state?: string;
    city?: string;
    propertyType?: string;
    budget?: string;
    rooms?: string;
  };
  compact?: boolean;
}

const propertyTypeOptions = [
  "All",
  "Apartment",
  "Loft",
  "Studio",
  "Penthouse",
  "Family Home",
  "Flat",
];

const stateOptions = ["All", "Maharashtra", "Karnataka", "Delhi"];

export default function PropertyFilter({ onFilter, initialFilters, compact = false }: FilterProps) {
  const [search, setSearch] = useState(initialFilters?.search || "");
  const [stateName, setStateName] = useState(initialFilters?.state || "All");
  const [city, setCity] = useState(initialFilters?.city || "All");
  const [propertyType, setPropertyType] = useState(initialFilters?.propertyType || "All");
  const [budget, setBudget] = useState(initialFilters?.budget || "Any");
  const [rooms, setRooms] = useState(initialFilters?.rooms || "Any");

  // Dropdown states
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);

  // Toggle Filters Panel state
  const [showFilters, setShowFilters] = useState(false);

  // Sync internal state with props (useful for page-level resets)
  useEffect(() => {
    setSearch(initialFilters?.search || "");
    setStateName(initialFilters?.state || "All");
    setCity(initialFilters?.city || "All");
    setPropertyType(initialFilters?.propertyType || "All");
    setBudget(initialFilters?.budget || "Any");
    setRooms(initialFilters?.rooms || "Any");
  }, [initialFilters]);

  // Handle changes when State is selected to update City
  const handleStateSelect = (selectedState: string) => {
    setStateName(selectedState);
    setIsStateOpen(false);
    
    // Reset city if it doesn't belong to the newly selected state
    if (selectedState === "Maharashtra") {
      if (city !== "Mumbai" && city !== "Pune") setCity("All");
    } else if (selectedState === "Karnataka") {
      if (city !== "Bengaluru") setCity("All");
    } else if (selectedState === "Delhi") {
      if (city !== "Delhi") setCity("All");
    } else {
      // If state is set to "All", keep current city or let it be
    }
  };

  // Get cities depending on state selection
  const getCitiesForState = () => {
    if (stateName === "Maharashtra") return ["Mumbai", "Pune"];
    if (stateName === "Karnataka") return ["Bengaluru"];
    if (stateName === "Delhi") return ["Delhi"];
    return cities;
  };

  const handleSearch = () => {
    onFilter({ search, state: stateName, city, propertyType, budget, rooms });
  };

  const handleClearAll = () => {
    setSearch("");
    setStateName("All");
    setCity("All");
    setPropertyType("All");
    setBudget("Any");
    setRooms("Any");
    onFilter({
      search: "",
      state: "All",
      city: "All",
      propertyType: "All",
      budget: "Any",
      rooms: "Any",
    });
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Primary Search Bar Row */}
      <div className="flex flex-col sm:flex-row gap-3 bg-card p-3 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-black/[0.04]">
        {/* Search Input Box */}
        <div className="flex-1 flex items-center gap-3 bg-surface px-4 py-3 rounded-2xl border border-black/[0.04] h-[48px]">
          <Search className="w-5 h-5 text-body/50 flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="Search apartments by title, description or location..."
            className="w-full bg-transparent border-none outline-none text-sm text-dark placeholder:text-body/50"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 justify-end sm:justify-start">
          {/* Advanced Filters Toggle Button */}
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-3 rounded-2xl border transition-all text-sm font-semibold flex items-center gap-2 h-[48px] ${
              showFilters
                ? "bg-brand/10 text-brand border-brand/20 shadow-sm"
                : "bg-surface text-body border-black/[0.04] hover:bg-black/[0.02] hover:text-dark"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>

          {/* Search Button */}
          <button
            type="button"
            onClick={handleSearch}
            className="flex-1 sm:flex-initial bg-dark hover:bg-brand text-white py-3 px-12 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 h-[48px] shadow-[0_2px_12px_rgba(58,66,60,0.15)] hover:scale-105 min-w-[160px]"
          >
            <span>Search</span>
          </button>
        </div>
      </div>

      {/* Advanced Filters Expandable Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-visible z-30"
          >
            <div className="bg-card rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] p-5 border border-black/[0.04] mt-1 relative z-30">
              {/* Header inside Filters Panel */}
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-black/[0.04]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-body/80">
                  Filter Properties
                </h4>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-xs font-semibold text-brand hover:text-brand-hover hover:underline transition-all flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Clear All Filters
                </button>
              </div>

              {/* Grid Content */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* State Dropdown */}
                <div className="flex flex-col relative">
                  <label className="text-[11px] font-bold text-body/60 uppercase tracking-wider mb-2 px-1">
                    State
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsStateOpen(!isStateOpen);
                      setIsCityOpen(false);
                      setIsTypeOpen(false);
                    }}
                    className="bg-surface px-4 py-2.5 rounded-2xl border border-black/[0.04] hover:bg-black/[0.01] transition-all text-xs font-medium text-dark flex items-center justify-between w-full h-[40px]"
                  >
                    <span>{stateName === "All" ? "All States" : stateName}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-body transition-transform duration-300 ${
                        isStateOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Options list */}
                  {isStateOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsStateOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-[calc(100%+4px)] left-0 w-full bg-card border border-black/[0.06] rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.08)] z-50 py-1 max-h-60 overflow-y-auto"
                      >
                        {stateOptions.map((st) => (
                          <div
                            key={st}
                            onClick={() => handleStateSelect(st)}
                            className={`px-4 py-2 text-xs hover:bg-surface transition-colors cursor-pointer text-dark ${
                              stateName === st ? "bg-brand/10 font-bold text-brand" : ""
                            }`}
                          >
                            {st === "All" ? "All States" : st}
                          </div>
                        ))}
                      </motion.div>
                    </>
                  )}
                </div>

                {/* City Dropdown */}
                <div className="flex flex-col relative">
                  <label className="text-[11px] font-bold text-body/60 uppercase tracking-wider mb-2 px-1">
                    City
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCityOpen(!isCityOpen);
                      setIsStateOpen(false);
                      setIsTypeOpen(false);
                    }}
                    className="bg-surface px-4 py-2.5 rounded-2xl border border-black/[0.04] hover:bg-black/[0.01] transition-all text-xs font-medium text-dark flex items-center justify-between w-full h-[40px]"
                  >
                    <span>{city === "All" ? "All Cities" : city}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-body transition-transform duration-300 ${
                        isCityOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Options list */}
                  {isCityOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsCityOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-[calc(100%+4px)] left-0 w-full bg-card border border-black/[0.06] rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.08)] z-50 py-1 max-h-60 overflow-y-auto"
                      >
                        <div
                          onClick={() => {
                            setCity("All");
                            setIsCityOpen(false);
                          }}
                          className={`px-4 py-2 text-xs hover:bg-surface transition-colors cursor-pointer text-dark ${
                            city === "All" ? "bg-brand/10 font-bold text-brand" : ""
                          }`}
                        >
                          All Cities
                        </div>
                        {getCitiesForState().map((c) => (
                          <div
                            key={c}
                            onClick={() => {
                              setCity(c);
                              setIsCityOpen(false);
                            }}
                            className={`px-4 py-2 text-xs hover:bg-surface transition-colors cursor-pointer text-dark ${
                              city === c ? "bg-brand/10 font-bold text-brand" : ""
                            }`}
                          >
                            {c}
                          </div>
                        ))}
                      </motion.div>
                    </>
                  )}
                </div>

                {/* Property Type Dropdown */}
                <div className="flex flex-col relative">
                  <label className="text-[11px] font-bold text-body/60 uppercase tracking-wider mb-2 px-1">
                    Property Type
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsTypeOpen(!isTypeOpen);
                      setIsStateOpen(false);
                      setIsCityOpen(false);
                    }}
                    className="bg-surface px-4 py-2.5 rounded-2xl border border-black/[0.04] hover:bg-black/[0.01] transition-all text-xs font-medium text-dark flex items-center justify-between w-full h-[40px]"
                  >
                    <span>{propertyType === "All" ? "All Types" : propertyType}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-body transition-transform duration-300 ${
                        isTypeOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Options list */}
                  {isTypeOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsTypeOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-[calc(100%+4px)] left-0 w-full bg-card border border-black/[0.06] rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.08)] z-50 py-1 max-h-60 overflow-y-auto"
                      >
                        {propertyTypeOptions.map((t) => (
                          <div
                            key={t}
                            onClick={() => {
                              setPropertyType(t);
                              setIsTypeOpen(false);
                            }}
                            className={`px-4 py-2 text-xs hover:bg-surface transition-colors cursor-pointer text-dark ${
                              propertyType === t ? "bg-brand/10 font-bold text-brand" : ""
                            }`}
                          >
                            {t === "All" ? "All Types" : t}
                          </div>
                        ))}
                      </motion.div>
                    </>
                  )}
                </div>

                {/* Monthly Budget Range Slider */}
                <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-2 px-1">
                    <label className="text-[11px] font-bold text-body/60 uppercase tracking-wider">
                      Max Budget
                    </label>
                    <span className="text-xs font-bold text-brand">
                      {budget === "Any" || parseInt(budget, 10) >= 4000 ? "Any Budget" : `€${budget}`}
                    </span>
                  </div>
                  <div className="flex items-center h-[40px] w-full px-3 bg-surface rounded-2xl border border-black/[0.04]">
                    <input
                      type="range"
                      min="500"
                      max="4000"
                      step="100"
                      value={budget === "Any" ? "4000" : budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full h-1 bg-black/10 rounded-2xl appearance-none cursor-pointer accent-brand"
                    />
                  </div>
                </div>

                {/* Rooms Selection */}
                <div className="flex flex-col">
                  <label className="text-[11px] font-bold text-body/60 uppercase tracking-wider mb-2 px-1">
                    Rooms
                  </label>
                  <div className="flex items-center gap-1 bg-surface p-1 rounded-2xl border border-black/[0.04] h-[40px] w-full">
                    {["Any", "1", "2", "3", "4+"].map((r) => {
                      const isSelected = rooms === r;
                      return (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setRooms(r)}
                          className={`flex-1 text-center py-1.5 text-[10px] font-bold rounded-xl transition-all duration-300 ${
                            isSelected
                              ? "bg-brand text-white shadow-sm"
                              : "text-body hover:text-dark hover:bg-black/[0.02]"
                          }`}
                        >
                          {r}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
