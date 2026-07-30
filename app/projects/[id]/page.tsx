import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Building, ShieldCheck, MapPin, Layers, Award, Sparkles } from "lucide-react";
import { projects } from "@/data/projects";
import Gallery from "@/components/Gallery";
import Map from "@/components/Map";
import ProjectInquiryForm from "@/components/ProjectInquiryForm";

// Helper for amenities icons mapping
const getAmenityIcon = (name: string) => {
  return <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />;
};

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const project = projects.find(p => p.id.toLowerCase() === id.toLowerCase());

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-32 pb-20 px-6 lg:px-12 xl:px-16 max-w-[1600px] mx-auto w-full min-h-screen">
      {/* Back to Projects */}
      <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-medium text-body/75 hover:text-dark transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Projects
      </Link>

      {/* Header Info */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
          <div>
            {/* Developer Logo Placeholder & Name */}
            <div className="flex items-center gap-2 text-brand font-semibold text-sm mb-1.5">
              <Building className="w-4 h-4" />
              <span>{project.developer}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-medium tracking-tight mb-3 text-dark font-serif">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 text-sm md:text-base text-body/75">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-body/60" />
                {project.location}
              </span>
              <span className="hidden md:inline">•</span>
              <span>{project.configuration}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
            <span className="bg-brand/10 text-brand font-semibold px-4 py-2 rounded-xl text-sm border border-brand/20">
              {project.availability}
            </span>
            <span className="text-xs font-semibold text-body/50 flex items-center gap-1.5 bg-surface border border-black/[0.03] px-3 py-1 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>RERA ID: {project.reraNumber}</span>
            </span>
          </div>
        </div>
        
        <p className="text-body leading-relaxed text-lg font-light max-w-4xl mt-6">
          {project.description}
        </p>
      </div>

      {/* Image Gallery */}
      <div className="mb-10">
        <Gallery images={project.gallery} />
      </div>

      {/* Specifications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Key Highlights */}
        <div className="lg:col-span-2 bg-card border border-black/[0.05] rounded-3xl p-6 md:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold uppercase tracking-wider text-dark border-b border-black/[0.04] pb-3.5 mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand" />
              Project Highlights
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-2.5 text-sm text-body/90 leading-relaxed font-light">
                  <Award className="w-4 h-4 text-brand mt-0.5 shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick Facts Box */}
        <div className="bg-card border border-black/[0.05] rounded-3xl p-6 md:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
          <h2 className="text-base font-bold uppercase tracking-wider text-dark border-b border-black/[0.04] pb-3.5 mb-6 flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand" />
            Quick Facts
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2.5 border-b border-black/[0.03]">
              <span className="text-xs text-body/70 font-light">Developer</span>
              <span className="text-sm font-semibold text-dark">{project.developer}</span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-black/[0.03]">
              <span className="text-xs text-body/70 font-light">Total Land Area</span>
              <span className="text-sm font-semibold text-dark">{project.totalArea}</span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-black/[0.03]">
              <span className="text-xs text-body/70 font-light">Starting Price</span>
              <span className="text-sm font-semibold text-brand">
                {project.startingPrice >= 100 
                  ? `₹ ${(project.startingPrice / 100).toFixed(2)} Cr*` 
                  : `₹ ${project.startingPrice} Lakhs*`}
              </span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-black/[0.03]">
              <span className="text-xs text-body/70 font-light">RERA Registered</span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-md">Yes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Amenities & Facilities */}
      <div className="bg-card border border-black/[0.05] rounded-3xl p-6 md:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.03)] mb-12">
        <h2 className="text-base font-bold uppercase tracking-wider text-dark border-b border-black/[0.04] pb-3.5 mb-6">
          Premium Amenities
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {project.amenities.map(amenity => (
            <div key={amenity} className="flex items-center gap-2.5 bg-surface border border-black/[0.03] p-4 rounded-2xl shadow-sm text-xs font-semibold text-dark">
              {getAmenityIcon(amenity)}
              <span className="truncate">{amenity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Location Map & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
        {/* Location Map */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-dark font-serif mb-2">Location</h2>
          <Map lat={project.coordinates.lat} lng={project.coordinates.lng} />
        </div>
        
        {/* Booking Sticky Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-32">
            <ProjectInquiryForm project={project} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id.toLowerCase(),
  }));
}
