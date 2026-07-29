import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Car, Wifi, Coffee, Wind, Maximize2 } from "lucide-react";
import { properties } from "@/data/properties";
import Gallery from "@/components/Gallery";
import Map from "@/components/Map";
import SmallForm from "@/components/SmallForm";

// Helper for amenities icons mapping
const getAmenityIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("wifi")) return <Wifi className="w-4 h-4 text-brand" />;
  if (n.includes("parking")) return <Car className="w-4 h-4 text-brand" />;
  if (n.includes("balcony") || n.includes("terrace")) return <Maximize2 className="w-4 h-4 text-brand" />;
  if (n.includes("heating") || n.includes("ac")) return <Wind className="w-4 h-4 text-brand" />;
  if (n.includes("kitchen")) return <Coffee className="w-4 h-4 text-brand" />;
  if (n.includes("washer")) return <CheckCircle2 className="w-4 h-4 text-brand" />;
  if (n.includes("elevator")) return <CheckCircle2 className="w-4 h-4 text-brand" />;
  return <CheckCircle2 className="w-4 h-4 text-brand" />;
};

export default async function PropertyDetailsPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  
  const property = properties.find(p => p.code.toLowerCase() === code.toLowerCase());

  if (!property) {
    notFound();
  }

  return (
    <div className="pt-32 pb-20 px-6 lg:px-12 xl:px-16 max-w-[1600px] mx-auto w-full min-h-screen">
      <Link href="/properties" className="inline-flex items-center gap-2 text-sm font-medium text-body/75 hover:text-dark transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Properties
      </Link>

      <Gallery images={property.gallery} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
        {/* Left Col - Details */}
        <div className="lg:col-span-2 flex flex-col gap-10">
          
          {/* Header Info */}
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-medium tracking-tight mb-2 text-dark font-serif">{property.title}</h1>
                <p className="text-lg text-body/75">{property.city} • {property.area}m² • {property.rooms} Rooms</p>
              </div>
              <div className="bg-brand/10 text-brand font-semibold px-4 py-2 rounded-md text-sm border border-brand/20">
                {property.code}
              </div>
            </div>
            <p className="text-body leading-relaxed text-lg font-light">
              {property.description}
            </p>
          </div>

          {/* Key Facts */}
          <div>
            <h2 className="text-xl font-medium mb-6">Key Facts</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4">
              <div>
                <p className="text-sm text-body/60 mb-1">Floor</p>
                <p className="font-medium text-dark">{property.floor}</p>
              </div>
              <div>
                <p className="text-sm text-body/60 mb-1">Balcony</p>
                <p className="font-medium text-dark">{property.balcony}</p>
              </div>
              <div>
                <p className="text-sm text-body/60 mb-1">Parking</p>
                <p className="font-medium text-dark">{property.parking}</p>
              </div>
              <div>
                <p className="text-sm text-body/60 mb-1">Furnished</p>
                <p className="font-medium text-dark">{property.furnished}</p>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="text-xl font-medium mb-6">Amenities</h2>
            <div className="flex flex-wrap gap-3">
              {property.amenities.map(amenity => (
                <div key={amenity} className="flex items-center gap-2 bg-card px-4 py-2 rounded-md shadow-sm text-sm font-medium text-body/90 border border-black/[0.04]">
                  {getAmenityIcon(amenity)}
                  {amenity}
                </div>
              ))}
            </div>
          </div>

          {/* Nearby */}
          <div>
            <h2 className="text-xl font-medium mb-6">Nearby Places</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {property.nearby.map(place => (
                <div key={place.name} className="flex justify-between items-center bg-card p-4 rounded-md shadow-sm border border-black/[0.04]">
                  <span className="font-medium text-sm text-dark">{place.name}</span>
                  <span className="text-sm text-body/80 bg-surface px-3 py-1 rounded-md border border-black/[0.03]">{place.distance}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div>
            <h2 className="text-xl font-medium mb-6">Location</h2>
            <Map lat={property.coordinates.lat} lng={property.coordinates.lng} />
          </div>
          
        </div>

        {/* Right Col - Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-32">
            <SmallForm property={property} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return properties.map((property) => ({
    code: property.code.toLowerCase(),
  }));
}
