import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProperty extends Document {
  title: string;
  code: string;
  city: string;
  state: string;
  propertyType: string;
  rooms: number;
  price: number; // Stored in Lakhs of INR
  area: number;
  availability: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  address?: string;
  gallery: string[];
  amenities: string[];
  nearby: { name: string; distance: string }[];
  description: string;
  floor: string;
  balcony: string;
  parking: string;
  furnished: string;
  status?: "New Listing" | "Sold";
}

const PropertySchema = new Schema<IProperty>(
  {
    title: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    propertyType: { type: String, required: true },
    rooms: { type: Number, required: true },
    price: { type: Number, required: true },
    area: { type: Number, required: true },
    availability: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: false },
      lng: { type: Number, required: false },
    },
    address: { type: String, required: false },
    gallery: [{ type: String }],
    amenities: [{ type: String }],
    nearby: [
      {
        name: { type: String, required: true },
        distance: { type: String, required: true },
      },
    ],
    description: { type: String, required: true },
    floor: { type: String, required: true },
    balcony: { type: String, required: true },
    parking: { type: String, required: true },
    furnished: { type: String, required: true },
    status: { type: String, enum: ["New Listing", "Sold"], default: "New Listing" },
  },
  { timestamps: true }
);

const Property: Model<IProperty> = mongoose.models.Property || mongoose.model<IProperty>("Property", PropertySchema);

export default Property;
