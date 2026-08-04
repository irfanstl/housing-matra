"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  X,
  Plus,
  Trash2,
  Loader2,
  CheckCircle,
  Building2,
  Sliders,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { Property } from "@/data/properties";

interface AddPropertyFormProps {
  onSuccess?: (newProperty: Property) => void;
}

interface NearbyPlace {
  name: string;
  distance: string;
}

const AMENITIES_LIST = [
  "WiFi",
  "Balcony",
  "Heating",
  "Kitchen",
  "Washer",
  "Elevator",
  "Parking",
  "Pet Friendly",
  "AC"
];

const PROPERTY_TYPES = [
  "Apartment",
  "Flat",
  "Loft",
  "Studio",
  "Penthouse",
  "Family Home"
];

export default function AddPropertyForm({ onSuccess }: AddPropertyFormProps) {
  const router = useRouter();
  
  // Step indicator
  const [step, setStep] = useState(1);
  const [stepChangedAt, setStepChangedAt] = useState(0);
  const totalSteps = 4;

  // Form State
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("Mumbai");
  const [state, setState] = useState("Maharashtra");
  const [propertyType, setPropertyType] = useState("Apartment");
  const [rooms, setRooms] = useState(2);
  const [price, setPrice] = useState(100); // In Lakhs
  const [area, setArea] = useState(800); // In sq ft
  const [availability, setAvailability] = useState("Immediate");
  const [description, setDescription] = useState("");
  
  // Specs
  const [floor, setFloor] = useState("3rd");
  const [balcony, setBalcony] = useState("Yes");
  const [parking, setParking] = useState("Available");
  const [furnished, setFurnished] = useState("Yes");

  // Coordinates
  const [lat, setLat] = useState(19.0760);
  const [lng, setLng] = useState(72.8777);

  // Address Form
  const [streetAddress, setStreetAddress] = useState("");
  const [locality, setLocality] = useState("");
  const [pincode, setPincode] = useState("");

  // Amenities
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(["WiFi"]);

  // Gallery (Image URLs)
  const [gallery, setGallery] = useState<string[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Nearby Places
  const [nearby, setNearby] = useState<NearbyPlace[]>([
    { name: "Supermarket", distance: "300m" },
    { name: "Metro Station", distance: "500m" }
  ]);
  const [newNearbyName, setNewNearbyName] = useState("");
  const [newNearbyDistance, setNewNearbyDistance] = useState("");

  // Form Submission
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Coordinate Defaults based on City
  const handleCityChange = (val: string) => {
    setCity(val);
    if (val === "Mumbai") {
      setState("Maharashtra");
      setLat(19.0760);
      setLng(72.8777);
    } else if (val === "Delhi") {
      setState("Delhi");
      setLat(28.6139);
      setLng(77.2090);
    } else if (val === "Bengaluru") {
      setState("Karnataka");
      setLat(12.9716);
      setLng(77.5946);
    } else if (val === "Pune") {
      setState("Maharashtra");
      setLat(18.5204);
      setLng(73.8567);
    }
  };

  // Convert image to base64 & upload to API
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setUploadingImage(true);
    setUploadError("");

    const uploadPromises = Array.from(files).map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          try {
            const base64Data = reader.result as string;
            const res = await fetch("/api/upload", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                file: base64Data,
                fileName: file.name
              })
            });

            const data = await res.json();
            if (!res.ok) {
              throw new Error(data.error || "Upload failed");
            }
            resolve(data.url);
          } catch (err: any) {
            reject(err);
          }
        };
        reader.onerror = () => reject(new Error("File reading failed"));
      });
    });

    try {
      const urls = await Promise.all(uploadPromises);
      setGallery((prev) => [...prev, ...urls]);
    } catch (err: any) {
      console.error(err);
      setUploadError(err.message || "Failed to upload one or more images.");
    } finally {
      setUploadingImage(false);
    }
  };

  // Remove uploaded image
  const removeImage = (indexToRemove: number) => {
    setGallery((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Add nearby place
  const addNearbyPlace = () => {
    if (!newNearbyName.trim() || !newNearbyDistance.trim()) return;
    setNearby((prev) => [...prev, { name: newNearbyName.trim(), distance: newNearbyDistance.trim() }]);
    setNewNearbyName("");
    setNewNearbyDistance("");
  };

  // Remove nearby place
  const removeNearbyPlace = (indexToRemove: number) => {
    setNearby((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Toggle Amenity
  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  // Submit Listing
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Date.now() - stepChangedAt < 500) {
      return;
    }

    if (step < totalSteps) {
      setStep((prev) => prev + 1);
      setStepChangedAt(Date.now());
      return;
    }

    if (
      !title.trim() ||
      !description.trim() ||
      gallery.length === 0 ||
      !streetAddress.trim() ||
      !locality.trim() ||
      !pincode.trim()
    ) {
      setSubmitError("Please fill in all mandatory fields, upload at least one image, and provide a complete address.");
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    const propertyPayload = {
      title,
      city,
      state,
      propertyType,
      rooms,
      price,
      area,
      availability,
      coordinates: { lat, lng },
      address: `${streetAddress}, ${locality}, Pincode: ${pincode}`,
      gallery,
      amenities: selectedAmenities,
      nearby,
      description,
      floor,
      balcony,
      parking,
      furnished
    };

    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(propertyPayload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create property");
      }

      setSubmitSuccess(true);
      setTimeout(() => {
        if (onSuccess) {
          onSuccess(data);
        } else {
          router.push(`/property/${data.code.toLowerCase()}`);
        }
      }, 2500);
    } catch (err: any) {
      setSubmitError(err.message || "An unexpected error occurred during submission.");
      setSubmitting(false);
    }
  };

  const nextStep = () => {
    // Basic validation before going to next step
    if (step === 1 && !title.trim()) {
      setSubmitError("Please provide a title for the property.");
      return;
    }
    setSubmitError("");
    setStep((prev) => Math.min(prev + 1, totalSteps));
    setStepChangedAt(Date.now());
  };

  const prevStep = () => {
    setSubmitError("");
    setStep((prev) => Math.max(prev - 1, 1));
    setStepChangedAt(Date.now());
  };

  return (
    <div>
      {/* Main Form Container */}
      <form onSubmit={handleSubmit} className="bg-card border border-black/[0.05] rounded-3xl p-6 sm:p-10 shadow-[0_4px_35px_rgba(0,0,0,0.02)]">
        
        {submitError && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
            {submitError}
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* STEP 1: Basic Info */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              <div className="border-b border-black/[0.04] pb-4">
                <h3 className="text-lg font-serif font-medium text-dark flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-brand" /> General Property Info
                </h3>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-dark/70">Property Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Spacious Luxury Apartment with Sea View"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-surface/30 border border-black/[0.08] focus:border-brand/60 focus:bg-white rounded-xl px-4 py-3 text-sm text-dark font-medium transition-all outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-dark/70">City</label>
                  <select
                    value={city}
                    onChange={(e) => handleCityChange(e.target.value)}
                    className="w-full bg-surface/30 border border-black/[0.08] focus:border-brand/60 focus:bg-white rounded-xl px-4 py-3 text-sm text-dark font-medium transition-all outline-none"
                  >
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Pune">Pune</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-dark/70">State</label>
                  <input
                    type="text"
                    value={state}
                    readOnly
                    className="w-full bg-surface/20 border border-black/[0.04] rounded-xl px-4 py-3 text-sm text-body/60 font-medium outline-none cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-dark/70">Property Type</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-surface/30 border border-black/[0.08] focus:border-brand/60 focus:bg-white rounded-xl px-4 py-3 text-sm text-dark font-medium transition-all outline-none"
                  >
                    {PROPERTY_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-dark/70">Availability</label>
                  <input
                    type="text"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full bg-surface/30 border border-black/[0.08] focus:border-brand/60 focus:bg-white rounded-xl px-4 py-3 text-sm text-dark font-medium transition-all outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-dark/70">Description *</label>
                <textarea
                  rows={4}
                  placeholder="Provide a detailed write-up about your property listing (minimum 2-3 sentences)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-surface/30 border border-black/[0.08] focus:border-brand/60 focus:bg-white rounded-xl px-4 py-3 text-sm text-dark font-medium transition-all outline-none resize-none"
                  required
                />
              </div>
            </motion.div>
          )}

          {/* STEP 2: Specifications */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              <div className="border-b border-black/[0.04] pb-4">
                <h3 className="text-lg font-serif font-medium text-dark flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-brand" /> Specifications & Pricing
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-dark/70">Rooms (BHK)</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={rooms}
                    onChange={(e) => setRooms(parseInt(e.target.value) || 1)}
                    className="w-full bg-surface/30 border border-black/[0.08] focus:border-brand/60 focus:bg-white rounded-xl px-4 py-3 text-sm text-dark font-medium transition-all outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-dark/70">Area (Sq. Ft.)</label>
                  <input
                    type="number"
                    min={1}
                    value={area}
                    onChange={(e) => setArea(parseInt(e.target.value) || 0)}
                    className="w-full bg-surface/30 border border-black/[0.08] focus:border-brand/60 focus:bg-white rounded-xl px-4 py-3 text-sm text-dark font-medium transition-all outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-dark/70 flex items-center gap-0.5">
                    Price (INR Lakhs)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={price}
                    onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                    className="w-full bg-surface/30 border border-black/[0.08] focus:border-brand/60 focus:bg-white rounded-xl px-4 py-3 text-sm text-dark font-medium transition-all outline-none"
                  />
                  <span className="text-[10px] text-body/70 font-semibold italic">
                    (e.g., 95 = 95 Lakhs, 120 = 1.2 Cr)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-dark/70">Floor</label>
                  <input
                    type="text"
                    placeholder="e.g. 3rd, 5th (Top)"
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                    className="w-full bg-surface/30 border border-black/[0.08] focus:border-brand/60 focus:bg-white rounded-xl px-4 py-3 text-sm text-dark font-medium transition-all outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-dark/70">Balcony</label>
                  <select
                    value={balcony}
                    onChange={(e) => setBalcony(e.target.value)}
                    className="w-full bg-surface/30 border border-black/[0.08] focus:border-brand/60 focus:bg-white rounded-xl px-4 py-3 text-sm text-dark font-medium transition-all outline-none"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Small">Small</option>
                    <option value="Terrace">Terrace</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-dark/70">Parking</label>
                  <select
                    value={parking}
                    onChange={(e) => setParking(e.target.value)}
                    className="w-full bg-surface/30 border border-black/[0.08] focus:border-brand/60 focus:bg-white rounded-xl px-4 py-3 text-sm text-dark font-medium transition-all outline-none"
                  >
                    <option value="Available">Available</option>
                    <option value="Included">Included</option>
                    <option value="Street">Street</option>
                    <option value="None">None</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-dark/70">Furnished</label>
                  <select
                    value={furnished}
                    onChange={(e) => setFurnished(e.target.value)}
                    className="w-full bg-surface/30 border border-black/[0.08] focus:border-brand/60 focus:bg-white rounded-xl px-4 py-3 text-sm text-dark font-medium transition-all outline-none"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Partially">Partially</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold uppercase tracking-wider text-dark/70">Amenities</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {AMENITIES_LIST.map((amenity) => {
                    const isSelected = selectedAmenities.includes(amenity);
                    return (
                      <button
                        type="button"
                        key={amenity}
                        onClick={() => toggleAmenity(amenity)}
                        className={`flex items-center justify-center p-3 rounded-xl text-xs font-semibold tracking-wide border transition-all ${
                          isSelected
                            ? "bg-brand/10 text-brand border-brand/50 shadow-sm"
                            : "bg-surface/20 text-body/80 border-black/[0.03] hover:bg-surface/40"
                        }`}
                      >
                        {amenity}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Image Uploads */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              <div className="border-b border-black/[0.04] pb-4">
                <h3 className="text-lg font-serif font-medium text-dark flex items-center gap-2">
                  <Upload className="w-5 h-5 text-brand" /> Media & Photos (ImageKit Storage)
                </h3>
              </div>

              {uploadError && (
                <div className="p-3 bg-red-50 text-red-700 border border-red-150 rounded-xl text-xs font-medium">
                  {uploadError}
                </div>
              )}

              {/* Upload Area */}
              <div className="group relative border-2 border-dashed border-black/[0.08] hover:border-brand/40 transition-colors bg-surface/10 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer min-h-[160px]">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                />
                
                {uploadingImage ? (
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 text-brand animate-spin" />
                    <p className="text-xs font-bold text-dark/80 tracking-wider uppercase">Uploading files to ImageKit...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-center pointer-events-none">
                    <div className="p-3 bg-brand/10 text-brand rounded-full group-hover:scale-110 transition-transform">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-semibold text-dark tracking-wide">Drag & Drop or Click to Upload Photos</p>
                    <p className="text-[10px] text-body/60 font-bold uppercase tracking-wider">Supports JPG, PNG, WEBP (Max 3 files recommended)</p>
                  </div>
                )}
              </div>

              {/* Uploaded Gallery Previews */}
              {gallery.length > 0 && (
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-dark/70">Uploaded Gallery ({gallery.length})</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {gallery.map((url, idx) => (
                      <div key={idx} className="relative aspect-[4/3] bg-surface rounded-2xl overflow-hidden border border-black/[0.05] group">
                        <img
                          src={url}
                          alt={`Listing Preview ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-2 right-2 p-1.5 rounded-xl bg-black/60 text-white hover:bg-red-600 transition-colors shadow-md opacity-0 group-hover:opacity-100 duration-200"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 4: Location & Places */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              <div className="border-b border-black/[0.04] pb-4">
                <h3 className="text-lg font-serif font-medium text-dark flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-brand" /> Location & Nearby Places
                </h3>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-dark/70">Street Address *</label>
                  <input
                    type="text"
                    placeholder="House/Plot No., Building Name, Street Name"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className="w-full bg-surface/30 border border-black/[0.08] focus:border-brand/60 focus:bg-white rounded-xl px-4 py-3 text-sm text-dark font-medium transition-all outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-dark/70">Locality / Area *</label>
                    <input
                      type="text"
                      placeholder="e.g. Bandra West, CP"
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      className="w-full bg-surface/30 border border-black/[0.08] focus:border-brand/60 focus:bg-white rounded-xl px-4 py-3 text-sm text-dark font-medium transition-all outline-none"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-dark/70">Pincode *</label>
                    <input
                      type="text"
                      placeholder="e.g. 400050"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full bg-surface/30 border border-black/[0.08] focus:border-brand/60 focus:bg-white rounded-xl px-4 py-3 text-sm text-dark font-medium transition-all outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold uppercase tracking-wider text-dark/70">Nearby Places (Amenities/Transits)</label>
                
                {/* Addition controls */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-2">
                  <div className="sm:col-span-7">
                    <input
                      type="text"
                      placeholder="e.g. Bandra Sea Link, Lodhi Garden"
                      value={newNearbyName}
                      onChange={(e) => setNewNearbyName(e.target.value)}
                      className="w-full bg-surface/30 border border-black/[0.08] focus:border-brand/60 focus:bg-white rounded-xl px-3 py-2.5 text-xs text-dark font-medium transition-all outline-none"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <input
                      type="text"
                      placeholder="e.g. 500m, 1.2km"
                      value={newNearbyDistance}
                      onChange={(e) => setNewNearbyDistance(e.target.value)}
                      className="w-full bg-surface/30 border border-black/[0.08] focus:border-brand/60 focus:bg-white rounded-xl px-3 py-2.5 text-xs text-dark font-medium transition-all outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addNearbyPlace}
                    className="sm:col-span-2 flex items-center justify-center gap-1.5 bg-brand text-white hover:bg-brand-hover transition-colors rounded-xl px-4 py-2.5 text-xs font-semibold shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>

                {/* Nearby list table */}
                {nearby.length > 0 ? (
                  <div className="border border-black/[0.03] rounded-2xl overflow-hidden bg-surface/10">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-surface/50 border-b border-black/[0.04] text-dark/85 font-bold uppercase tracking-wider">
                          <th className="p-3">Location Name</th>
                          <th className="p-3">Distance</th>
                          <th className="p-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {nearby.map((place, idx) => (
                          <tr key={idx} className="border-b border-black/[0.03] hover:bg-white/40 transition-colors">
                            <td className="p-3 font-semibold text-dark">{place.name}</td>
                            <td className="p-3 text-body/90 font-medium">{place.distance}</td>
                            <td className="p-3 text-right">
                              <button
                                type="button"
                                onClick={() => removeNearbyPlace(idx)}
                                className="text-body hover:text-red-600 transition-colors p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-xs text-body/60 font-semibold italic">No nearby attractions listed yet.</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center border-t border-black/[0.04] pt-8 mt-8">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-body hover:text-dark transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-1.5 bg-brand hover:bg-brand-hover text-white rounded-full px-6 py-2.5 text-xs sm:text-sm font-semibold shadow-sm hover:scale-[1.03] transition-all"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting || submitSuccess}
              className="flex items-center gap-2 bg-brand hover:bg-brand-hover text-white rounded-full px-8 py-3 text-xs sm:text-sm font-bold tracking-wide uppercase shadow-sm hover:scale-[1.03] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                </>
              ) : submitSuccess ? (
                <>
                  <CheckCircle className="w-4 h-4" /> Created!
                </>
              ) : (
                "Publish Listing"
              )}
            </button>
          )}
        </div>
      </form>

      {/* Success Modal Overlay */}
      <AnimatePresence>
        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white border border-brand/20 p-8 sm:p-10 rounded-3xl text-center max-w-[420px] w-full shadow-2xl flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-brand/10 text-brand rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-serif text-dark mb-2">Listing Published!</h3>
              <p className="text-sm text-body/80 leading-relaxed mb-6">
                Your property listing has been successfully saved to MongoDB and uploaded images are stored on ImageKit. Redirecting you to the listing details page...
              </p>
              <Loader2 className="w-5 h-5 text-brand animate-spin" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
