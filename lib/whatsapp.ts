import { Property } from "@/data/properties";
import { Project } from "@/data/projects";

export const generateWhatsAppLink = (
  property: Property,
  name: string,
  phone: string,
  email: string,
  userCity: string,
  message: string
) => {
  const phoneNum = "919561028609";
  
  let text = `Hi, I am interested in buying this apartment.`;

  const details = [];
  if (name) details.push(`Name: ${name}`);
  if (phone) details.push(`Phone: ${phone}`);
  if (email) details.push(`Email: ${email}`);
  if (userCity) details.push(`City: ${userCity}`);
  if (message) details.push(`Message: ${message}`);

  if (details.length > 0) {
    text += `\n\n*My Details*\n${details.join('\n')}`;
  }

  text += `\n\n*Property Details*\n`;
  text += `Title: ${property.title}\n`;
  text += `Code: ${property.code}\n`;
  text += `City: ${property.city}\n`;
  text += `BHK: ${property.rooms} BHK\n`;
  text += `Area: ${property.area} sq.ft\n`;
  
  const formattedPrice = property.price >= 100 
    ? `₹${(property.price / 100).toFixed(2)} Cr` 
    : `₹${property.price} Lakhs`;
  text += `Price: ${formattedPrice}\n`;
  text += `Floor: ${property.floor}\n`;
  text += `Balcony: ${property.balcony}\n`;
  text += `Parking: ${property.parking}\n`;
  text += `Furnished: ${property.furnished}`;

  return `https://wa.me/${phoneNum}?text=${encodeURIComponent(text)}`;
};

export const generateGeneralWhatsAppLink = (
  name: string,
  phone: string,
  email: string,
  preferredCity: string,
  message: string
) => {
  const phoneNum = "919561028609";
  
  let text = `Hi,\n\nI am interested in buying a flat.`;

  const details = [];
  if (name) details.push(`Name: ${name}`);
  if (phone) details.push(`Phone: ${phone}`);
  if (email) details.push(`Email: ${email}`);
  if (preferredCity) details.push(`Preferred City: ${preferredCity}`);
  if (message) details.push(`Message: ${message}`);

  if (details.length > 0) {
    text += `\n\n${details.join('\n\n')}`;
  }

  return `https://wa.me/${phoneNum}?text=${encodeURIComponent(text)}`;
};

export const generateProjectWhatsAppLink = (
  project: Project,
  name: string,
  phone: string,
  email: string,
  userCity: string,
  message: string
) => {
  const phoneNum = "919561028609";
  
  let text = `Hi, I am interested in this real estate project: ${project.title}.`;

  const details = [];
  if (name) details.push(`Name: ${name}`);
  if (phone) details.push(`Phone: ${phone}`);
  if (email) details.push(`Email: ${email}`);
  if (userCity) details.push(`City: ${userCity}`);
  if (message) details.push(`Message: ${message}`);

  if (details.length > 0) {
    text += `\n\n*My Details*\n${details.join('\n')}`;
  }

  text += `\n\n*Project Details*\n`;
  text += `Name: ${project.title}\n`;
  text += `Developer: ${project.developer}\n`;
  text += `Location: ${project.location}\n`;
  text += `Configuration: ${project.configuration}\n`;
  text += `Price Range: ${project.priceRange}\n`;
  text += `RERA Number: ${project.reraNumber}`;

  return `https://wa.me/${phoneNum}?text=${encodeURIComponent(text)}`;
};

