import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Car, Wifi, Coffee, Wind, Maximize2, MapPin } from "lucide-react";
import { Property, properties } from "@/data/properties";
import Gallery from "@/components/Gallery";
import Map from "@/components/Map";
import SmallForm from "@/components/SmallForm";
import dbConnect from "@/backend/config/db";
import PropertyModel from "@/backend/models/Property";

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
  
  let property: Property | null = null;

  try {
    await dbConnect();
    const dbProperty = await PropertyModel.findOne({
      code: { $regex: new RegExp(`^${code}$`, "i") }
    }).lean();

    if (dbProperty) {
      property = JSON.parse(JSON.stringify(dbProperty));
    }
  } catch (error) {
    console.error("Failed to fetch property from MongoDB:", error);
  }

  if (!property) {
    property = properties.find(p => p.code.toLowerCase() === code.toLowerCase()) || null;
  }

  if (!property) {
    notFound();
  }

  return (
    <div className="pt-32 pb-20 px-6 lg:px-12 xl:px-16 max-w-[1600px] mx-auto w-full min-h-screen">
      <Link href="/properties" className="inline-flex items-center gap-2 text-sm font-medium text-body/75 hover:text-dark transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Properties
      </Link>

      {/* Header Info */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-2 text-dark font-serif">{property.title}</h1>
            <p className="text-lg text-body/75">{property.city}, {property.state} • {property.area} sq.ft • {property.rooms} BHK • {property.price >= 100 ? `₹${(property.price / 100).toFixed(2)} Cr` : `₹${property.price} Lakhs`}</p>
          </div>
          <div className="bg-brand/10 text-brand font-semibold px-4 py-2 rounded-md text-sm border border-brand/20 flex-shrink-0">
            {property.code}
          </div>
        </div>
        <p className="text-body leading-relaxed text-lg font-light max-w-4xl">
          {property.description}
        </p>
      </div>

      {/* Property Images Gallery */}
      <div className="mb-10">
        <Gallery images={property.gallery} />
      </div>

      {/* Boxed Quick Details Card (Key Facts, Amenities, Nearby Places) - Below Property Images */}
      <div className="bg-card border border-black/[0.05] rounded-2xl p-6 md:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.03)] mb-10">
        <h2 className="text-base font-bold uppercase tracking-wider text-dark border-b border-black/[0.04] pb-3.5 mb-6">
          Quick Details & Specifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Key Facts (including Furnished) */}
          <div className="bg-surface/50 p-5 rounded-xl border border-black/[0.02] flex flex-col justify-between">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-body/70 mb-4">Key Facts</h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-2">
              <div>
                <p className="text-[10px] uppercase font-bold text-body/50 tracking-wider mb-0.5">Floor</p>
                <p className="font-semibold text-dark text-sm">{property.floor}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-body/50 tracking-wider mb-0.5">Balcony</p>
                <p className="font-semibold text-dark text-sm">{property.balcony}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-body/50 tracking-wider mb-0.5">Parking</p>
                <p className="font-semibold text-dark text-sm">{property.parking}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-body/50 tracking-wider mb-0.5">Furnished</p>
                <p className="font-semibold text-dark text-sm">{property.furnished}</p>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-surface/50 p-5 rounded-xl border border-black/[0.02]">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-body/70 mb-4">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {property.amenities.map(amenity => (
                <div key={amenity} className="flex items-center gap-1.5 bg-card px-3 py-1.5 rounded-lg shadow-sm text-xs font-semibold text-body/90 border border-black/[0.04]">
                  {getAmenityIcon(amenity)}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nearby Places */}
          <div className="bg-surface/50 p-5 rounded-xl border border-black/[0.02]">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-body/70 mb-4">Nearby Places</h3>
            <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto pr-1">
              {property.nearby.map(place => (
                <div key={place.name} className="flex justify-between items-center bg-card p-2.5 rounded-lg shadow-sm border border-black/[0.04]">
                  <span className="font-semibold text-xs text-dark truncate max-w-[130px]">{place.name}</span>
                  <span className="text-[10px] text-body/80 bg-surface px-2 py-0.5 rounded border border-black/[0.03] flex-shrink-0">{place.distance}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Map & Inquiry Sticky Form grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
        {/* Left Column - Location map */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-dark font-serif mb-2">Location</h2>
          {property.address && (
            <p className="text-sm text-body/80 font-medium mb-1">
              <MapPin className="inline w-4 h-4 text-brand mr-1" />
              {property.address}
            </p>
          )}
          <Map lat={property.coordinates?.lat} lng={property.coordinates?.lng} address={property.address} />
        </div>
        
        {/* Right Column - Booking sticky form */}
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
