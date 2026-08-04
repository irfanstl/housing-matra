"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilter from "@/components/PropertyFilter";
import AddPropertyForm from "@/components/AddPropertyForm";
import { motion } from "framer-motion";
import { RotateCcw, Loader2 } from "lucide-react";

function ManagePropertiesContent() {
  const searchParams = useSearchParams();
  
  const [dbProperties, setDbProperties] = useState<typeof properties>([]);
  const [loading, setLoading] = useState(true);
  
  // Set initial tab from query string or default to 'manage'
  const tabParam = searchParams?.get("tab");
  const [viewMode, setViewMode] = useState<"manage" | "add">(
    (tabParam as "manage" | "add") || "manage"
  );

  useEffect(() => {
    if (tabParam === "manage" || tabParam === "add") {
      setViewMode(tabParam);
    }
  }, [tabParam]);

  useEffect(() => {
    fetch("/api/properties")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setDbProperties(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API error:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (code: string) => {
    if (!confirm(`Are you sure you want to permanently delete listing ${code}?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/properties?code=${code}`, {
        method: "DELETE"
      });
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete listing");
      }

      alert("Listing deleted successfully!");
      setDbProperties((prev) => prev.filter((p) => p.code !== code));
    } catch (err: any) {
      console.error("Delete failed:", err);
      alert(err.message || "Failed to delete listing.");
    }
  };

  const handleAddSuccess = (newProp: any) => {
    setDbProperties((prev) => [newProp, ...prev]);
    setViewMode("manage");
  };

  const [filters, setFilters] = useState({
    search: searchParams?.get("search") || "",
    state: searchParams?.get("state") || "All",
    city: searchParams?.get("city") || "All",
    propertyType: searchParams?.get("propertyType") || "All",
    budget: searchParams?.get("budget") || "Any",
    rooms: searchParams?.get("rooms") || "Any"
  });

  const getFilteredProperties = () => {
    let result = dbProperties;

    if (filters.search.trim() !== "") {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.state.toLowerCase().includes(q) ||
          p.propertyType.toLowerCase().includes(q)
      );
    }

    if (filters.state !== "All") {
      result = result.filter(p => p.state === filters.state);
    }

    if (filters.city !== "All") {
      result = result.filter(p => p.city === filters.city);
    }

    if (filters.propertyType !== "All") {
      result = result.filter(p => p.propertyType === filters.propertyType);
    }

    if (filters.budget !== "Any") {
      const maxBudget = parseInt(filters.budget, 10);
      if (!isNaN(maxBudget)) {
        result = result.filter(p => p.price <= maxBudget);
      }
    }
    
    if (filters.rooms !== "Any") {
      if (filters.rooms === "4+") {
        result = result.filter(p => p.rooms >= 4);
      } else {
        result = result.filter(p => p.rooms.toString() === filters.rooms);
      }
    }

    return result;
  };

  const filteredProperties = getFilteredProperties();

  const handleFilter = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      state: "All",
      city: "All",
      propertyType: "All",
      budget: "Any",
      rooms: "Any"
    });
  };

  return (
    <div className="pt-32 pb-20 px-6 lg:px-12 xl:px-16 max-w-[1600px] mx-auto w-full min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-grow"
        >
          <h1 className="text-4xl font-medium tracking-tight mb-2">Manage Listings</h1>
          <p className="text-body/75 mb-6">Create, update, and manage your property listings database.</p>
          
          {/* Tab Selector */}
          <div className="inline-flex p-1 bg-surface/50 backdrop-blur-sm border border-black/[0.04] rounded-full shadow-sm">
            <button
              type="button"
              onClick={() => setViewMode("manage")}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                viewMode === "manage"
                  ? "bg-brand text-white shadow-sm"
                  : "text-body/80 hover:text-dark"
              }`}
            >
              Manage Properties
            </button>
            <button
              type="button"
              onClick={() => setViewMode("add")}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                viewMode === "add"
                  ? "bg-brand text-white shadow-sm"
                  : "text-body/80 hover:text-dark"
              }`}
            >
              Add Property
            </button>
          </div>
        </motion.div>
        
        {viewMode === "manage" && (
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={resetFilters}
            className="flex items-center gap-2 text-sm font-medium text-body/75 hover:text-dark transition-colors mb-2"
          >
            <RotateCcw className="w-4 h-4" /> Reset Filters
          </motion.button>
        )}
      </div>

      {viewMode === "manage" ? (
        <>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <PropertyFilter onFilter={handleFilter} initialFilters={filters} compact={false} />
          </motion.div>

          {loading ? (
            <div className="py-20 w-full flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 text-brand animate-spin" />
              <p className="text-xs text-body/70 font-semibold uppercase tracking-wider">Loading properties...</p>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="py-20 text-center">
              <h3 className="text-xl font-medium mb-2">No properties found</h3>
              <p className="text-body/75">Try adjusting your search filters.</p>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProperties.map((prop, idx) => (
                <PropertyCard 
                  key={prop.code} 
                  property={prop} 
                  index={idx} 
                  manageMode={true}
                  onDelete={handleDelete}
                />
              ))}
            </motion.div>
          )}
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-[900px] mx-auto w-full"
        >
          <AddPropertyForm onSuccess={handleAddSuccess} />
        </motion.div>
      )}
    </div>
  );
}

export default function ManagePropertiesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading portal...</div>}>
      <ManagePropertiesContent />
    </Suspense>
  );
}
