import dbConnect from "@/backend/config/db";
import PropertyModel from "@/backend/models/Property";
import { properties as staticProperties } from "@/data/properties";
import { notFound } from "next/navigation";
import EditPropertyForm from "./EditPropertyForm";

export default async function EditPropertyPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;

  let property = null;

  try {
    await dbConnect();
    const dbProperty = await PropertyModel.findOne({
      code: { $regex: new RegExp(`^${code}$`, "i") }
    }).lean();

    if (dbProperty) {
      property = JSON.parse(JSON.stringify(dbProperty));
    }
  } catch (error) {
    console.error("Failed to query property for editing:", error);
  }

  // Fallback to static mock properties
  if (!property) {
    property = staticProperties.find((p) => p.code.toLowerCase() === code.toLowerCase()) || null;
  }

  if (!property) {
    notFound();
  }

  return <EditPropertyForm initialProperty={property} />;
}

export function generateStaticParams() {
  return staticProperties.map((property) => ({
    code: property.code.toLowerCase(),
  }));
}
