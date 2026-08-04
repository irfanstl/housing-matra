import dbConnect from "@/backend/config/db";
import PropertyModel from "@/backend/models/Property";
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



  if (!property) {
    notFound();
  }

  return <EditPropertyForm initialProperty={property} />;
}

export async function generateStaticParams() {
  try {
    await dbConnect();
    const dbProperties = await PropertyModel.find({}, { code: 1 }).lean();
    return dbProperties.map((p) => ({
      code: p.code.toLowerCase(),
    }));
  } catch (error) {
    console.error("Failed to query codes for static params:", error);
    return [];
  }
}
