"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Property } from "@/data/properties";
import AddPropertyForm from "@/components/AddPropertyForm";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  RotateCcw, 
  Plus, 
  Building2, 
  TrendingUp, 
  CircleDollarSign, 
  Clock, 
  CheckCircle2, 
  Trash2, 
  Edit3, 
  Loader2, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Filter
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function AdminContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State for all properties fetched from DB
  const [dbProperties, setDbProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState<string | null>(null);
  
  // View mode tab: "list" or "add"
  const [viewMode, setViewMode] = useState<"list" | "add">("list");

  // Filters State
  const [filters, setFilters] = useState({
    search: "",
    city: "All",
    propertyType: "All",
    status: "All"
  });

  // Fetch properties from API
  const fetchProperties = () => {
    setLoading(true);
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
        console.error("API error fetching properties:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Quick toggle status handler
  const handleStatusChange = async (code: string, newStatus: "New Listing" | "Sold") => {
    setStatusUpdating(code);
    try {
      const res = await fetch("/api/properties", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, status: newStatus })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update status");

      setDbProperties((prev) =>
        prev.map((p) => (p.code === code ? { ...p, status: newStatus } : p))
      );
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to update property status.");
    } finally {
      setStatusUpdating(null);
    }
  };

  // Delete handler
  const handleDelete = async (code: string) => {
    if (!confirm(`Are you sure you want to permanently delete listing ${code}?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/properties?code=${code}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete listing");

      alert("Listing deleted successfully!");
      setDbProperties((prev) => prev.filter((p) => p.code !== code));
    } catch (err: any) {
      console.error("Delete failed:", err);
      alert(err.message || "Failed to delete listing.");
    }
  };

  // Success handler for adding property
  const handleAddSuccess = (newProp: Property) => {
    setDbProperties((prev) => [newProp, ...prev]);
    setViewMode("list");
  };

  // Calculations for Stats
  const totalListings = dbProperties.length;
  const activeListings = dbProperties.filter((p) => p.status !== "Sold").length;
  const soldListings = dbProperties.filter((p) => p.status === "Sold").length;
  const totalValueLakhs = dbProperties.reduce((sum, p) => sum + p.price, 0);

  const formatPrice = (lakhs: number) => {
    if (lakhs >= 100) {
      const cr = lakhs / 100;
      return `₹${cr.toFixed(2).replace(/\.00$/, "")} Cr`;
    }
    return `₹${lakhs} L`;
  };

  const formatStatsValue = (lakhs: number) => {
    if (lakhs >= 100) {
      const cr = lakhs / 100;
      return `₹${cr.toFixed(2)} Cr`;
    }
    return `₹${lakhs} Lakhs`;
  };

  // Filtering Logic
  const getFilteredProperties = () => {
    return dbProperties.filter((p) => {
      // Search filter
      const matchesSearch =
        filters.search === "" ||
        p.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.code.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.city.toLowerCase().includes(filters.search.toLowerCase());

      // City filter
      const matchesCity = filters.city === "All" || p.city === filters.city;

      // Property type filter
      const matchesType = filters.propertyType === "All" || p.propertyType === filters.propertyType;

      // Status filter
      const matchesStatus =
        filters.status === "All" ||
        (filters.status === "Active" && p.status !== "Sold") ||
        (filters.status === "Sold" && p.status === "Sold");

      return matchesSearch && matchesCity && matchesType && matchesStatus;
    });
  };

  const filteredProperties = getFilteredProperties();

  // Reset Filters
  const resetFilters = () => {
    setFilters({
      search: "",
      city: "All",
      propertyType: "All",
      status: "All"
    });
  };

  // Extract unique cities & types for options
  const uniqueCities = Array.from(new Set(dbProperties.map((p) => p.city)));
  const uniqueTypes = Array.from(new Set(dbProperties.map((p) => p.propertyType)));

  return (
    <div className="pt-32 pb-20 px-6 lg:px-12 xl:px-16 max-w-[1600px] mx-auto w-full min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-brand/10 text-brand px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Control Panel
            </span>
          </div>
          <h1 className="text-4xl font-serif text-dark font-medium tracking-tight mb-2">
            Admin Properties Dashboard
          </h1>
          <p className="text-body/75">
            Manage your real estate catalog, monitor statuses, and update pricing.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex p-1 bg-white/60 border border-black/[0.04] backdrop-blur-sm rounded-full shadow-sm"
        >
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              viewMode === "list"
                ? "bg-brand text-white shadow-sm"
                : "text-body/80 hover:text-dark"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" /> List Listings
          </button>
          <button
            type="button"
            onClick={() => setViewMode("add")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              viewMode === "add"
                ? "bg-brand text-white shadow-sm"
                : "text-body/80 hover:text-dark"
            }`}
          >
            <Plus className="w-3.5 h-3.5" /> Add Property
          </button>
        </motion.div>
      </div>

      {/* Stats Cards Section */}
      <AnimatePresence mode="wait">
        {viewMode === "list" && (
          <motion.div
            key="stats-dashboard"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {/* Stat 1: Total Listings */}
            <div className="bg-white border border-black/[0.04] rounded-3xl p-6 shadow-[0_2px_15px_rgba(0,0,0,0.02)] flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-body/65 mb-1">
                  Total Listings
                </p>
                <h4 className="text-3xl font-serif font-bold text-dark">
                  {loading ? "..." : totalListings}
                </h4>
              </div>
              <div className="p-4 bg-brand/10 text-brand rounded-2xl">
                <Building2 className="w-6 h-6" />
              </div>
            </div>

            {/* Stat 2: Portfolio Value */}
            <div className="bg-white border border-black/[0.04] rounded-3xl p-6 shadow-[0_2px_15px_rgba(0,0,0,0.02)] flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-body/65 mb-1">
                  Portfolio Value
                </p>
                <h4 className="text-3xl font-serif font-bold text-dark">
                  {loading ? "..." : formatStatsValue(totalValueLakhs)}
                </h4>
              </div>
              <div className="p-4 bg-brand/10 text-brand rounded-2xl">
                <CircleDollarSign className="w-6 h-6" />
              </div>
            </div>

            {/* Stat 3: Active Listings */}
            <div className="bg-white border border-black/[0.04] rounded-3xl p-6 shadow-[0_2px_15px_rgba(0,0,0,0.02)] flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-body/65 mb-1">
                  Active Listings
                </p>
                <h4 className="text-3xl font-serif font-bold text-dark text-green-700">
                  {loading ? "..." : activeListings}
                </h4>
              </div>
              <div className="p-4 bg-green-50 text-green-700 rounded-2xl">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>

            {/* Stat 4: Sold Listings */}
            <div className="bg-white border border-black/[0.04] rounded-3xl p-6 shadow-[0_2px_15px_rgba(0,0,0,0.02)] flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-body/65 mb-1">
                  Sold Listings
                </p>
                <h4 className="text-3xl font-serif font-bold text-dark text-accent-blue">
                  {loading ? "..." : soldListings}
                </h4>
              </div>
              <div className="p-4 bg-amber-50 text-amber-700 rounded-2xl">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Tab Content */}
      <AnimatePresence mode="wait">
        {viewMode === "list" ? (
          <motion.div
            key="list-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col gap-6"
          >
            {/* Filters bar */}
            <div className="bg-white border border-black/[0.04] rounded-3xl p-5 shadow-[0_2px_15px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                {/* Search */}
                <div className="relative w-full sm:w-[260px]">
                  <Search className="w-4 h-4 text-body/60 absolute left-4.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Search by title, code, city..."
                    value={filters.search}
                    onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                    className="w-full bg-surface/30 border border-black/[0.06] rounded-2xl pl-11 pr-4 py-2.5 text-xs text-dark font-medium transition-all focus:border-brand/50 focus:bg-white outline-none"
                  />
                </div>

                {/* City */}
                <select
                  value={filters.city}
                  onChange={(e) => setFilters((prev) => ({ ...prev, city: e.target.value }))}
                  className="bg-surface/30 border border-black/[0.06] rounded-2xl px-4 py-2.5 text-xs text-dark font-semibold outline-none focus:border-brand/50 focus:bg-white cursor-pointer"
                >
                  <option value="All">All Cities</option>
                  {uniqueCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>

                {/* Property Type */}
                <select
                  value={filters.propertyType}
                  onChange={(e) => setFilters((prev) => ({ ...prev, propertyType: e.target.value }))}
                  className="bg-surface/30 border border-black/[0.06] rounded-2xl px-4 py-2.5 text-xs text-dark font-semibold outline-none focus:border-brand/50 focus:bg-white cursor-pointer"
                >
                  <option value="All">All Types</option>
                  {uniqueTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>

                {/* Status */}
                <select
                  value={filters.status}
                  onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
                  className="bg-surface/30 border border-black/[0.06] rounded-2xl px-4 py-2.5 text-xs text-dark font-semibold outline-none focus:border-brand/50 focus:bg-white cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active Listings</option>
                  <option value="Sold">Sold listings</option>
                </select>
              </div>

              {/* Reset filter button */}
              <button
                type="button"
                onClick={resetFilters}
                className="flex items-center gap-2 text-xs font-semibold text-body/75 hover:text-dark transition-colors py-2 px-4 hover:bg-surface/30 rounded-xl"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
              </button>
            </div>

            {/* List Table Container */}
            <div className="bg-white border border-black/[0.04] rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.01)] overflow-hidden">
              {loading ? (
                <div className="py-24 flex flex-col items-center justify-center gap-3">
                  <Loader2 className="w-8 h-8 text-brand animate-spin" />
                  <p className="text-xs text-body/70 font-semibold uppercase tracking-wider">
                    Loading Property Database...
                  </p>
                </div>
              ) : filteredProperties.length === 0 ? (
                <div className="py-24 text-center">
                  <Building2 className="w-12 h-12 text-muted mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-dark mb-1">No listings found</h3>
                  <p className="text-body/70 text-sm">
                    No properties match your active filter search parameters.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface/30 border-b border-black/[0.04] text-[10px] text-dark font-bold uppercase tracking-wider">
                        <th className="p-4 sm:p-5 pl-6 sm:pl-8">Property</th>
                        <th className="p-4 sm:p-5">Type</th>
                        <th className="p-4 sm:p-5">Location</th>
                        <th className="p-4 sm:p-5">Specifications</th>
                        <th className="p-4 sm:p-5">Price</th>
                        <th className="p-4 sm:p-5">Status Quick Toggle</th>
                        <th className="p-4 sm:p-5 pr-6 sm:pr-8 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/[0.03]">
                      {filteredProperties.map((prop, idx) => {
                        const isSold = prop.status === "Sold";
                        
                        return (
                          <tr 
                            key={prop.code} 
                            className="hover:bg-surface/10 transition-colors text-xs"
                          >
                            {/* Property info & Image */}
                            <td className="p-4 sm:p-5 pl-6 sm:pl-8 min-w-[260px]">
                              <div className="flex items-center gap-4">
                                <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-black/[0.06] bg-surface flex-shrink-0">
                                  {prop.gallery && prop.gallery[0] ? (
                                    <Image
                                      src={prop.gallery[0]}
                                      alt={prop.title}
                                      fill
                                      className="object-cover"
                                      sizes="64px"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-muted text-body/50">
                                      N/A
                                    </div>
                                  )}
                                </div>
                                <div className="flex flex-col gap-0.5">
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-[10px] px-1.5 py-0.5 bg-brand/10 text-brand rounded uppercase">
                                      {prop.code}
                                    </span>
                                  </div>
                                  <span className="font-semibold text-dark line-clamp-1 hover:text-brand transition-colors">
                                    <Link href={`/property/${prop.code.toLowerCase()}`} target="_blank">
                                      {prop.title}
                                    </Link>
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Property Type */}
                            <td className="p-4 sm:p-5 font-semibold text-body/90">
                              {prop.propertyType}
                            </td>

                            {/* Location */}
                            <td className="p-4 sm:p-5 text-body/80">
                              <span className="font-semibold text-dark block">{prop.city}</span>
                              <span className="text-[10px] text-body/60 font-medium">{prop.state}</span>
                            </td>

                            {/* Specs */}
                            <td className="p-4 sm:p-5 text-body/85 font-medium">
                              <span className="block">{prop.rooms} BHK</span>
                              <span className="text-[10px] text-body/60">{prop.area} sq.ft • {prop.floor} Floor</span>
                            </td>

                            {/* Price */}
                            <td className="p-4 sm:p-5 font-bold text-dark text-sm">
                              {formatPrice(prop.price)}
                            </td>

                            {/* Status Quick Toggle */}
                            <td className="p-4 sm:p-5">
                              <div className="flex items-center gap-2">
                                <select
                                  value={prop.status || "New Listing"}
                                  onChange={(e) => 
                                    handleStatusChange(prop.code, e.target.value as "New Listing" | "Sold")
                                  }
                                  disabled={statusUpdating === prop.code}
                                  className={`bg-white border rounded-xl px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider outline-none cursor-pointer shadow-sm transition-all focus:border-brand ${
                                    isSold 
                                      ? "text-accent-blue border-brand/20 bg-brand/5" 
                                      : "text-green-700 border-green-200 bg-green-50/30"
                                  }`}
                                >
                                  <option value="New Listing">New Listing</option>
                                  <option value="Sold">Sold</option>
                                </select>
                                {statusUpdating === prop.code && (
                                  <Loader2 className="w-3.5 h-3.5 text-brand animate-spin" />
                                )}
                              </div>
                            </td>

                            {/* Action Buttons */}
                            <td className="p-4 sm:p-5 pr-6 sm:pr-8 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {/* View details */}
                                <Link
                                  href={`/property/${prop.code.toLowerCase()}`}
                                  target="_blank"
                                  className="p-2 bg-surface/40 hover:bg-surface/80 text-body hover:text-brand rounded-xl transition-all"
                                  title="View Public Details"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </Link>

                                {/* Edit */}
                                <Link
                                  href={`/properties/edit/${prop.code.toLowerCase()}`}
                                  className="p-2 bg-brand/5 hover:bg-brand/20 text-brand rounded-xl transition-all"
                                  title="Edit Listing"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </Link>

                                {/* Delete */}
                                <button
                                  type="button"
                                  onClick={() => handleDelete(prop.code)}
                                  className="p-2 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 rounded-xl transition-all"
                                  title="Delete Listing"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="add-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-[900px] mx-auto w-full"
          >
            {/* Embedding standard AddPropertyForm */}
            <div className="bg-white border border-black/[0.04] rounded-3xl p-2.5 shadow-[0_2px_20px_rgba(0,0,0,0.02)]">
              <AddPropertyForm onSuccess={handleAddSuccess} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading admin portal...</div>}>
      <AdminContent />
    </Suspense>
  );
}
