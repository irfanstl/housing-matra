export interface Property {
  title: string;
  code: string;
  city: string;
  rooms: number;
  price: number;
  area: number;
  availability: string;
  coordinates: {
    lat: number;
    lng: number;
  };
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

export const properties: Property[] = [
  {
    title: "Elegant City Center Apartment",
    code: "BR21",
    city: "Mumbai",
    rooms: 2,
    price: 1200,
    area: 48,
    availability: "01.08.2026",
    coordinates: { lat: 19.0760, lng: 72.8777 },
    gallery: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=1000"
    ],
    amenities: ["WiFi", "Balcony", "Heating", "Kitchen", "Washer", "Elevator"],
    nearby: [
      { name: "Marine Drive", distance: "1.2 km" },
      { name: "Metro Station", distance: "300m" },
      { name: "Supermarket", distance: "250m" }
    ],
    description: "A beautifully maintained 2-room apartment in the heart of Mumbai. Features a modern kitchen, spacious balcony, and plenty of natural light. Perfect for professionals looking for a premium living experience.",
    floor: "3rd",
    balcony: "Yes",
    parking: "Available",
    furnished: "Yes",
    status: "New Listing"
  },
  {
    title: "Modern Loft near Sea Link",
    code: "BR22",
    city: "Mumbai",
    rooms: 3,
    price: 1800,
    area: 85,
    availability: "15.09.2026",
    coordinates: { lat: 19.0500, lng: 72.8300 },
    gallery: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000"
    ],
    amenities: ["WiFi", "Heating", "Kitchen", "Parking", "Elevator", "Pet Friendly"],
    nearby: [
      { name: "Bandra Sea Link", distance: "200m" },
      { name: "Train Station", distance: "500m" }
    ],
    description: "Spacious loft with industrial design elements. Open floor plan, high ceilings, and premium finishes throughout.",
    floor: "5th",
    balcony: "No",
    parking: "Included",
    furnished: "Partially",
    status: "Sold"
  },
  {
    title: "Cozy Studio in Connaught Place",
    code: "MU11",
    city: "Delhi",
    rooms: 1,
    price: 950,
    area: 35,
    availability: "01.07.2026",
    coordinates: { lat: 28.6139, lng: 77.2090 },
    gallery: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=1000"
    ],
    amenities: ["WiFi", "Heating", "Kitchen", "Washer"],
    nearby: [
      { name: "Lodhi Garden", distance: "800m" },
      { name: "Metro Hub", distance: "1.5km" }
    ],
    description: "Compact but perfectly laid out studio in one of Delhi's best neighborhoods. Ideal for students or single professionals.",
    floor: "2nd",
    balcony: "No",
    parking: "Street",
    furnished: "Yes",
    status: "New Listing"
  },
  {
    title: "Spacious Family Home",
    code: "MU12",
    city: "Delhi",
    rooms: 4,
    price: 2500,
    area: 120,
    availability: "01.10.2026",
    coordinates: { lat: 28.5500, lng: 77.2500 },
    gallery: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=1000"
    ],
    amenities: ["WiFi", "Balcony", "Heating", "Kitchen", "Parking", "Washer", "Pet Friendly"],
    nearby: [
      { name: "School", distance: "400m" },
      { name: "Park", distance: "100m" }
    ],
    description: "Generous 4-room apartment suitable for families in Greater Kailash. Features two bathrooms, a large balcony, and a quiet courtyard.",
    floor: "1st",
    balcony: "Yes (Large)",
    parking: "Available",
    furnished: "No",
    status: "Sold"
  },
  {
    title: "Harbor View Apartment",
    code: "HH08",
    city: "Bengaluru",
    rooms: 2,
    price: 1400,
    area: 55,
    availability: "15.08.2026",
    coordinates: { lat: 12.9716, lng: 77.5946 },
    gallery: [
      "https://images.unsplash.com/photo-1499916078039-922301b0eb9b?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000"
    ],
    amenities: ["WiFi", "Balcony", "Heating", "Kitchen", "Elevator"],
    nearby: [
      { name: "MG Road", distance: "1km" },
      { name: "Indiranagar", distance: "1.5km" }
    ],
    description: "Modern apartment with partial harbor views. Features floor-to-ceiling windows and high-end appliances.",
    floor: "4th",
    balcony: "Yes",
    parking: "Available",
    furnished: "Partially"
  },
  {
    title: "Chic Altbau Flat",
    code: "HH09",
    city: "Bengaluru",
    rooms: 3,
    price: 1650,
    area: 75,
    availability: "01.09.2026",
    coordinates: { lat: 12.9800, lng: 77.6100 },
    gallery: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=1000"
    ],
    amenities: ["WiFi", "Heating", "Kitchen", "Washer"],
    nearby: [
      { name: "Sternschanze", distance: "800m" },
      { name: "Cafe District", distance: "100m" }
    ],
    description: "Classic Bengaluru flat with stucco ceilings, wooden floors, and a charming atmosphere in a lively neighborhood.",
    floor: "2nd",
    balcony: "Small",
    parking: "Street",
    furnished: "No"
  },
  {
    title: "Penthouse with Skyline View",
    code: "FR04",
    city: "Pune",
    rooms: 3,
    price: 2200,
    area: 90,
    availability: "01.11.2026",
    coordinates: { lat: 18.5204, lng: 73.8567 },
    gallery: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1000"
    ],
    amenities: ["WiFi", "Balcony", "Heating", "Kitchen", "Parking", "Elevator", "Washer"],
    nearby: [
      { name: "Koregaon Park", distance: "500m" },
      { name: "Central Station", distance: "1.2km" }
    ],
    description: "Exclusive penthouse offering breathtaking views of the Pune skyline. Premium amenities and a large rooftop terrace.",
    floor: "8th (Top)",
    balcony: "Terrace",
    parking: "Included",
    furnished: "Yes"
  },
  {
    title: "Quiet Retreat in Kalyani Nagar",
    code: "FR05",
    city: "Pune",
    rooms: 2,
    price: 1350,
    area: 60,
    availability: "15.07.2026",
    coordinates: { lat: 18.5500, lng: 73.9000 },
    gallery: [
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1499916078039-922301b0eb9b?auto=format&fit=crop&q=80&w=1000"
    ],
    amenities: ["WiFi", "Heating", "Kitchen", "Washer"],
    nearby: [
      { name: "Mula Mutha River", distance: "600m" },
      { name: "Museum Embankment", distance: "800m" }
    ],
    description: "Peaceful 2-room apartment located in the popular Kalyani Nagar district. Close to restaurants, bars, and the river.",
    floor: "1st",
    balcony: "No",
    parking: "Street",
    furnished: "Partially"
  },
  {
    title: "City Center Smart Apartment",
    code: "BR23",
    city: "Mumbai",
    rooms: 2,
    price: 1300,
    area: 55,
    availability: "01.09.2026",
    coordinates: { lat: 19.0600, lng: 72.8500 },
    gallery: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000"
    ],
    amenities: ["WiFi", "Heating", "Kitchen", "Washer", "Elevator"],
    nearby: [
      { name: "Bandra East", distance: "800m" },
      { name: "Subway", distance: "200m" }
    ],
    description: "Modern smart-home ready apartment in a vibrant neighborhood in Mumbai.",
    floor: "2nd",
    balcony: "Yes",
    parking: "Available",
    furnished: "Yes"
  },
  {
    title: "Premium Penthouse in GK",
    code: "MU13",
    city: "Delhi",
    rooms: 4,
    price: 3200,
    area: 140,
    availability: "15.08.2026",
    coordinates: { lat: 28.5300, lng: 77.2400 },
    gallery: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1000"
    ],
    amenities: ["WiFi", "Balcony", "Heating", "Kitchen", "Parking", "Elevator", "Washer", "Pet Friendly"],
    nearby: [
      { name: "Art Gallery", distance: "400m" },
      { name: "Central Station", distance: "1km" }
    ],
    description: "Luxurious penthouse with designer furniture and a large roof terrace in Delhi.",
    floor: "6th (Top)",
    balcony: "Terrace",
    parking: "Included",
    furnished: "Yes"
  },
  {
    title: "Sunny Apartment by the Lake",
    code: "HH10",
    city: "Bengaluru",
    rooms: 3,
    price: 1850,
    area: 82,
    availability: "01.10.2026",
    coordinates: { lat: 12.9800, lng: 77.6200 },
    gallery: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=1000"
    ],
    amenities: ["WiFi", "Balcony", "Heating", "Kitchen", "Washer", "Elevator"],
    nearby: [
      { name: "Ulsoor Lake", distance: "300m" },
      { name: "Park", distance: "100m" }
    ],
    description: "Bright apartment right next to the Ulsoor lake with beautiful walking paths in Bengaluru.",
    floor: "3rd",
    balcony: "Yes",
    parking: "Street",
    furnished: "No"
  },
  {
    title: "Designer Studio near Viman Nagar",
    code: "FR06",
    city: "Pune",
    rooms: 1,
    price: 1100,
    area: 42,
    availability: "01.07.2026",
    coordinates: { lat: 18.5600, lng: 73.9100 },
    gallery: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=1000"
    ],
    amenities: ["WiFi", "Heating", "Kitchen", "Washer", "Elevator"],
    nearby: [
      { name: "Viman Nagar Square", distance: "500m" },
      { name: "Bus Station", distance: "150m" }
    ],
    description: "Compact, well-designed studio ideal for business travelers or expats in Pune.",
    floor: "4th",
    balcony: "No",
    parking: "Available",
    furnished: "Yes"
  }
];
