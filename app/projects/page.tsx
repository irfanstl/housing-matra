"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, RotateCcw, SlidersHorizontal } from "lucide-react";

function ProjectsPageContent() {
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    city: searchParams.get("city") || "All",
    developer: searchParams.get("developer") || "All",
    status: searchParams.get("status") || "All"
  });

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const cityOptions = ["All", "Mumbai", "Pune", "Delhi NCR", "Bengaluru"];
  const developerOptions = ["All", "Lodha Group", "DLF", "Godrej Properties", "Sobha Limited"];
  const statusOptions = ["All", "Ready to Move", "Under Construction", "New Launch"];

  const getFilteredProjects = () => {
    let result = projects;

    if (filters.search.trim() !== "") {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.developer.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q)
      );
    }

    if (filters.city !== "All") {
      result = result.filter(p => p.city === filters.city);
    }

    if (filters.developer !== "All") {
      result = result.filter(p => p.developer === filters.developer);
    }

    if (filters.status !== "All") {
      result = result.filter(p => p.availability === filters.status);
    }

    return result;
  };

  const filteredProjects = getFilteredProjects();

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setActiveDropdown(null);
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      city: "All",
      developer: "All",
      status: "All"
    });
    setActiveDropdown(null);
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="pt-32 pb-20 px-6 lg:px-12 xl:px-16 max-w-[1600px] mx-auto w-full min-h-screen">
      {/* Title & Subtitle */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-medium tracking-tight mb-2 font-serif text-dark">Premier Projects</h1>
          <p className="text-body/75">Explore luxury townships, high-rises, and golf estates by India&apos;s leading developers.</p>
        </motion.div>
        
        <motion.button 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={resetFilters}
          className="flex items-center gap-2 text-sm font-medium text-body/75 hover:text-dark transition-colors bg-surface px-4 py-2 rounded-2xl border border-black/[0.04] shadow-sm"
        >
          <RotateCcw className="w-4 h-4" /> Reset Filters
        </motion.button>
      </div>

      {/* Modern Filter Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-card border border-black/[0.04] p-4 rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] mb-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="relative md:col-span-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search className="w-4 h-4 text-body/40" />
            </span>
            <input
              type="text"
              placeholder="Search Lodha, DLF, city..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full bg-surface border border-black/[0.03] pl-11 pr-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-brand/20 transition-all text-xs font-medium text-dark placeholder-body/50"
            />
          </div>

          {/* City Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("city")}
              className="w-full bg-surface border border-black/[0.03] px-4 py-3 rounded-2xl flex justify-between items-center text-xs font-semibold text-dark hover:bg-black/[0.01] transition-colors"
            >
              <span className="text-body/60 font-medium mr-1.5">City:</span>
              <span className="truncate max-w-[120px]">{filters.city}</span>
              <ChevronDown className={`w-4 h-4 ml-auto text-body/50 transition-transform duration-300 ${activeDropdown === "city" ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {activeDropdown === "city" && (
                <>
                  <div className="fixed inset-0 z-20" onClick={() => setActiveDropdown(null)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 right-0 mt-2 bg-white border border-black/[0.05] rounded-2xl shadow-xl z-30 overflow-hidden"
                  >
                    {cityOptions.map(option => (
                      <button
                        key={option}
                        onClick={() => handleFilterChange("city", option)}
                        className={`w-full text-left px-4 py-2.5 text-xs transition-colors hover:bg-surface ${filters.city === option ? "bg-brand/5 text-brand font-semibold" : "text-body"}`}
                      >
                        {option}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Developer Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("developer")}
              className="w-full bg-surface border border-black/[0.03] px-4 py-3 rounded-2xl flex justify-between items-center text-xs font-semibold text-dark hover:bg-black/[0.01] transition-colors"
            >
              <span className="text-body/60 font-medium mr-1.5">Developer:</span>
              <span className="truncate max-w-[120px]">{filters.developer}</span>
              <ChevronDown className={`w-4 h-4 ml-auto text-body/50 transition-transform duration-300 ${activeDropdown === "developer" ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {activeDropdown === "developer" && (
                <>
                  <div className="fixed inset-0 z-20" onClick={() => setActiveDropdown(null)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 right-0 mt-2 bg-white border border-black/[0.05] rounded-2xl shadow-xl z-30 overflow-hidden"
                  >
                    {developerOptions.map(option => (
                      <button
                        key={option}
                        onClick={() => handleFilterChange("developer", option)}
                        className={`w-full text-left px-4 py-2.5 text-xs transition-colors hover:bg-surface ${filters.developer === option ? "bg-brand/5 text-brand font-semibold" : "text-body"}`}
                      >
                        {option}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("status")}
              className="w-full bg-surface border border-black/[0.03] px-4 py-3 rounded-2xl flex justify-between items-center text-xs font-semibold text-dark hover:bg-black/[0.01] transition-colors"
            >
              <span className="text-body/60 font-medium mr-1.5">Status:</span>
              <span className="truncate max-w-[120px]">{filters.status}</span>
              <ChevronDown className={`w-4 h-4 ml-auto text-body/50 transition-transform duration-300 ${activeDropdown === "status" ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {activeDropdown === "status" && (
                <>
                  <div className="fixed inset-0 z-20" onClick={() => setActiveDropdown(null)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 right-0 mt-2 bg-white border border-black/[0.05] rounded-2xl shadow-xl z-30 overflow-hidden"
                  >
                    {statusOptions.map(option => (
                      <button
                        key={option}
                        onClick={() => handleFilterChange("status", option)}
                        className={`w-full text-left px-4 py-2.5 text-xs transition-colors hover:bg-surface ${filters.status === option ? "bg-brand/5 text-brand font-semibold" : "text-body"}`}
                      >
                        {option}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Grid of Results */}
      {filteredProjects.length === 0 ? (
        <div className="py-20 text-center">
          <h3 className="text-xl font-medium mb-2 font-serif text-dark">No projects found</h3>
          <p className="text-body/75">Try adjusting your filters or search keywords.</p>
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((proj, idx) => (
            <ProjectCard key={proj.id} project={proj} index={idx} />
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading projects...</div>}>
      <ProjectsPageContent />
    </Suspense>
  );
}
