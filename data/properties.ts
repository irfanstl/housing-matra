export interface Property {
  title: string;
  code: string;
  city: string;
  state: string;
  propertyType: string;
  rooms: number;
  price: number; // Stored in Lakhs of INR (e.g., 95 = 95 Lakhs, 120 = 1.20 Crore)
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

export const properties: Property[] = [];
