"use client";

import { MapPin } from "lucide-react";

interface MapProps {
  lat: number;
  lng: number;
}

export default function Map({ lat, lng }: MapProps) {
  return (
    <div className="w-full h-[400px] bg-card rounded-3xl overflow-hidden relative border border-black/5 flex items-center justify-center">
      {/* Real map would be here. For demo, we use a placeholder styling */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-16 h-16 bg-brand/20 rounded-full flex items-center justify-center mb-2 animate-pulse">
          <MapPin className="w-8 h-8 text-brand" />
        </div>
        <p className="font-medium text-sm text-black/60">
          Location: {lat.toFixed(4)}, {lng.toFixed(4)}
        </p>
      </div>
    </div>
  );
}
