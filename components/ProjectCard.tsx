"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Project } from "@/data/projects";
import { MapPin, Building, ShieldCheck, IndianRupee } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready to Move":
        return "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20";
      case "Under Construction":
        return "bg-amber-500/10 text-amber-600 border border-amber-500/20";
      case "New Launch":
        return "bg-brand/10 text-brand border border-brand/20";
      default:
        return "bg-blue-500/10 text-blue-600 border border-blue-500/20";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="group flex flex-col bg-card rounded-3xl p-3.5 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:scale-[1.02] transition-all duration-500 border border-black/[0.04]"
    >
      {/* Gallery Image & Badges */}
      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4">
        <Image
          src={project.gallery[0]}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Developer Badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] uppercase font-bold tracking-wider text-dark shadow-sm z-10 flex items-center gap-1 border border-black/[0.05]">
          <Building className="w-3 h-3 text-brand" />
          {project.developer}
        </div>

        {/* Status Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-xl text-[10px] uppercase font-bold tracking-wider shadow-sm z-10 ${getStatusColor(project.availability)}`}>
          {project.availability}
        </div>

        {/* Total Area Info Overlay */}
        <div className="absolute bottom-3 left-3 bg-dark/75 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-semibold tracking-wide text-white shadow-sm z-10">
          Land Area: {project.totalArea}
        </div>
      </div>

      {/* Content */}
      <div className="px-2.5 flex flex-col flex-grow">
        {/* Project Title */}
        <h3 className="font-semibold text-lg md:text-xl mb-1.5 text-dark font-serif tracking-wide group-hover:text-brand transition-colors duration-300">
          {project.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-body/70 text-xs mb-3">
          <MapPin className="w-3.5 h-3.5 text-body/60 shrink-0" />
          <span className="truncate">{project.location}</span>
        </div>

        {/* Specifications List */}
        <div className="grid grid-cols-2 gap-3 py-3 border-y border-black/[0.04] mb-4 text-xs">
          <div>
            <p className="text-[10px] uppercase font-bold text-body/50 tracking-wider mb-0.5">Configurations</p>
            <p className="font-semibold text-dark truncate">{project.configuration.split(" Apartments")[0]}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-body/50 tracking-wider mb-0.5">RERA Reg.</p>
            <p className="font-semibold text-dark flex items-center gap-1 truncate" title={project.reraNumber}>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{project.reraNumber}</span>
            </p>
          </div>
        </div>

        {/* Price & Action Button */}
        <div className="mt-auto pt-1 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase font-bold text-body/50 tracking-wider mb-0.5">Starting Price</p>
            <div className="flex items-center text-brand font-bold text-base md:text-lg">
              <IndianRupee className="w-4 h-4 shrink-0" />
              <span>
                {project.startingPrice >= 100 
                  ? `${(project.startingPrice / 100).toFixed(2)} Cr*` 
                  : `${project.startingPrice} Lakhs*`}
              </span>
            </div>
          </div>

          <Link
            href={`/projects/${project.id}`}
            className="px-5 py-2.5 bg-brand text-white hover:bg-brand-dark rounded-2xl text-xs font-semibold tracking-wide transition-all duration-300 shadow-md hover:shadow-brand/20 hover:scale-105"
          >
            View Project
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
