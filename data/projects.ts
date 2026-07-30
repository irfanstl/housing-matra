export interface Project {
  id: string;
  title: string;
  developer: string;
  city: string;
  state: string;
  location: string;
  reraNumber: string;
  availability: "Under Construction" | "Ready to Move" | "New Launch";
  priceRange: string;
  startingPrice: number; // in Lakhs, e.g., 125 = 1.25 Cr
  configuration: string;
  totalArea: string;
  highlights: string[];
  amenities: string[];
  description: string;
  gallery: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const projects: Project[] = [
  {
    id: "lodha-belmondo",
    title: "Lodha Belmondo",
    developer: "Lodha Group",
    city: "Pune",
    state: "Maharashtra",
    location: "Gahunje, Mumbai-Pune Expressway, Pune",
    reraNumber: "P52100000182",
    availability: "Ready to Move",
    priceRange: "₹1.25 Cr - ₹4.50 Cr",
    startingPrice: 125,
    configuration: "2, 3 & 4 BHK Apartments, Penthouses & Villas",
    totalArea: "45 Acres",
    highlights: [
      "90% open spaces with a 45-acre riverside development",
      "9-hole golf course designed by golf legend Greg Norman",
      "50,000 sq. ft. mega clubhouse with premium spa and gym",
      "Private helipad and high-security access control",
      "Scenic views of the Pavana River"
    ],
    amenities: [
      "Golf Course",
      "Clubhouse",
      "Swimming Pool",
      "Gym",
      "Spa",
      "Tennis Courts",
      "Cricket Pitch",
      "24/7 Security",
      "Restaurant & Cafe"
    ],
    description: "Lodha Belmondo offers a luxury resort-like living experience on the banks of the Pavana River. Located on the Mumbai-Pune Expressway, it features a 9-hole Greg Norman golf course, a vast clubhouse, and expansive green spaces designed for an active, serene lifestyle away from the city's hustle, yet perfectly connected.",
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1587151711096-23c51fcd26a1?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000"
    ],
    coordinates: { lat: 18.7051, lng: 73.6994 }
  },
  {
    id: "lodha-world-towers",
    title: "The World Towers",
    developer: "Lodha Group",
    city: "Mumbai",
    state: "Maharashtra",
    location: "Lower Parel, South Mumbai, Mumbai",
    reraNumber: "P51900008345",
    availability: "Ready to Move",
    priceRange: "₹8.50 Cr - ₹25.00 Cr",
    startingPrice: 850,
    configuration: "3, 4 & 5 BHK Residences & Presidential Suites",
    totalArea: "17 Acres",
    highlights: [
      "One of India's tallest residential structures",
      "Interiors designed by Armani/Casa",
      "7-level private parking and premium concierge services",
      "Private theater, athletic track, and indoor pool",
      "Stunning 360-degree views of the Arabian Sea and city skyline"
    ],
    amenities: [
      "Armani/Casa Interiors",
      "Clubhouse",
      "Indoor & Outdoor Pools",
      "Gym",
      "Spa",
      "Private Theater",
      "Sports Lounge",
      "Helipad",
      "Concierge Service"
    ],
    description: "The World Towers by Lodha Group is a soaring landmark in the heart of Mumbai. Standing tall in Lower Parel, this iconic development offers an ultra-luxurious lifestyle with interiors curated by Armani/Casa, world-class amenities, private high-speed elevators, and unparalleled panoramas of the sea.",
    gallery: [
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1000"
    ],
    coordinates: { lat: 19.0016, lng: 72.8288 }
  },
  {
    id: "lodha-altamount",
    title: "Lodha Altamount",
    developer: "Lodha Group",
    city: "Mumbai",
    state: "Maharashtra",
    location: "Altamount Road, Billionaires' Row, Mumbai",
    reraNumber: "P51900000320",
    availability: "Ready to Move",
    priceRange: "₹20.00 Cr - ₹45.00 Cr",
    startingPrice: 2000,
    configuration: "4 & 5 BHK Uber-Luxury Mansions",
    totalArea: "2 Acres",
    highlights: [
      "Located on Altamount Road, India's most exclusive street",
      "Only one residence per floor for ultimate privacy",
      "Fully customized layouts with double-glazed glass facades",
      "State-of-the-art security systems and valet services",
      "Private infinity pool overlooking the ocean"
    ],
    amenities: [
      "Infinity Pool",
      "Private Elevators",
      "Clubhouse",
      "Gym",
      "Spa & Salon",
      "Valet Parking",
      "Concierge Service",
      "Banquet Hall"
    ],
    description: "Lodha Altamount is an address of absolute power and luxury, situated on Mumbai's famous Billionaires' Row. Reserved for a select few, this towering architectural masterpiece features single-occupancy floor plans, floor-to-ceiling glass wrapping, and exceptional views, establishing a new peak in residential refinement.",
    gallery: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1545464693-f1798a373343?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000"
    ],
    coordinates: { lat: 18.9669, lng: 72.8078 }
  },
  {
    id: "dlf-camellias",
    title: "DLF The Camellias",
    developer: "DLF",
    city: "Delhi NCR",
    state: "Haryana",
    location: "Golf Course Road, Sector 42, Gurgaon",
    reraNumber: "15 OF 2017",
    availability: "Ready to Move",
    priceRange: "₹18.00 Cr - ₹50.00 Cr",
    startingPrice: 1800,
    configuration: "4 & 5 BHK Ultra-Luxury Apartments & Penthouses",
    totalArea: "16 Acres",
    highlights: [
      "Stunning views of the DLF Golf and Country Club",
      "IGBC Platinum certified green building construction",
      "Massive 1.5 Lakh sq. ft. super-luxury clubhouse",
      "Private lifts opening directly inside apartments",
      "Soundproof acoustics and triple-layered water filtration"
    ],
    amenities: [
      "Golf Course Views",
      "Megaclubhouse",
      "Swimming Pool",
      "Gym",
      "Spa & Turkish Hamam",
      "Fine Dining Restaurants",
      "Concierge Service",
      "Private Bar"
    ],
    description: "DLF The Camellias is the crown jewel of Gurgaon's skyline, located on the prestigious Golf Course Road. Unifying world-class design, expansive structural scale, and a lavish clubhouse, this development is widely regarded as one of the most premium address solutions in Northern India.",
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000"
    ],
    coordinates: { lat: 28.4552, lng: 77.1009 }
  },
  {
    id: "godrej-golf-links",
    title: "Godrej Golf Links",
    developer: "Godrej Properties",
    city: "Delhi NCR",
    state: "Uttar Pradesh",
    location: "Sector 27, Greater Noida",
    reraNumber: "UPRERAPRJ1324",
    availability: "Under Construction",
    priceRange: "₹2.20 Cr - ₹6.50 Cr",
    startingPrice: 220,
    configuration: "3 & 4 BHK Luxury Villas & Townhouses",
    totalArea: "100 Acres",
    highlights: [
      "100-acre master-planned township with low-density layout",
      "Private 9-hole golf course surrounding the villas",
      "Dedicated organic farming zones and butterfly garden",
      "Excellent connectivity to Jewar International Airport",
      "State-of-the-art sports academy and multiple clubhouses"
    ],
    amenities: [
      "Private Golf Course",
      "Clubhouses",
      "Swimming Pool",
      "Gym",
      "Sports Academy",
      "Organic Gardens",
      "Jogging Track",
      "24/7 Security"
    ],
    description: "Godrej Golf Links is a vast green township located in Greater Noida. Designed around a sprawling golf course, the project features luxurious independent villas and townhouses, offering residents a serene lifestyle rich in health, sport, and ecological awareness.",
    gallery: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000"
    ],
    coordinates: { lat: 28.4682, lng: 77.5135 }
  },
  {
    id: "sobha-royal-pavilion",
    title: "Sobha Royal Pavilion",
    developer: "Sobha Limited",
    city: "Bengaluru",
    state: "Karnataka",
    location: "Sarjapur Road, Hadosiddapura, Bengaluru",
    reraNumber: "PRM/KA/RERA/1251/446/PR/181122/002189",
    availability: "New Launch",
    priceRange: "₹1.65 Cr - ₹3.80 Cr",
    startingPrice: 165,
    configuration: "2, 3 & 4 BHK Rajasthani Palace Themed Apartments",
    totalArea: "24 Acres",
    highlights: [
      "Exquisite Rajasthani palace-themed architecture (chhatris, jharokhas)",
      "Vast central courtyard, stepwell (Baoli), and fountains",
      "No-common-walls design ensures complete unit privacy",
      "Pre-engineered German construction templates for superior build quality",
      "Located in the primary IT corridor of East Bengaluru"
    ],
    amenities: [
      "Grand Palace Clubhouse",
      "Stepwell (Baoli) Pool",
      "Gym",
      "Billiards Room",
      "Cricket Pitch",
      "Activity Lawn",
      "24/7 Security",
      "Kids Play Area"
    ],
    description: "Sobha Royal Pavilion is a tribute to Rajasthan's royal heritage, bringing majestic palace architecture to Sarjapur Road, Bengaluru. Elaborate stone details, grand arches, and ornamental stepwells are merged with high-grade modern construction, giving tech-sector professionals an exceptionally distinct and noble home address.",
    gallery: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1527030280862-64139fbe04ca?auto=format&fit=crop&q=80&w=1000"
    ],
    coordinates: { lat: 12.9056, lng: 77.7122 }
  }
];
