import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/backend/config/db";
import PropertyModel from "@/backend/models/Property";
import { properties as staticProperties } from "@/data/properties";

// GET Handler - Fetch all properties
export async function GET() {
  try {
    await dbConnect();
    const dbProperties = await PropertyModel.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(dbProperties);
  } catch (error: any) {
    console.error("GET /api/properties failed:", error);
    return NextResponse.json([]);
  }
}

// POST Handler - Create a new property
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const data = await request.json();

    // Generate a unique 5-char uppercase code (e.g. PR514)
    let code = "";
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 20) {
      const randNum = Math.floor(100 + Math.random() * 900); // 3 digit random number
      code = `PR${randNum}`;
      const existing = await PropertyModel.findOne({ code });
      if (!existing) {
        isUnique = true;
      }
      attempts++;
    }

    // Backup generator if there are persistent collisions
    if (!isUnique) {
      code = `PR${Date.now().toString().slice(-3)}`;
    }

    // Assemble property object
    const newPropertyData = {
      ...data,
      code,
      status: "New Listing"
    };

    const newProperty = new PropertyModel(newPropertyData);
    await newProperty.save();

    return NextResponse.json(newProperty, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/properties failed:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create new property listing" },
      { status: 500 }
    );
  }
}

// PUT Handler - Update an existing property
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const data = await request.json();
    const { code, ...updateData } = data;

    if (!code) {
      return NextResponse.json({ error: "Missing property code" }, { status: 400 });
    }

    const updatedProperty = await PropertyModel.findOneAndUpdate(
      { code: { $regex: new RegExp(`^${code}$`, "i") } },
      { $set: updateData },
      { new: true }
    ).lean();

    if (!updatedProperty) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProperty);
  } catch (error: any) {
    console.error("PUT /api/properties failed:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update property listing" },
      { status: 500 }
    );
  }
}

// DELETE Handler - Delete a property listing
export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { error: "Missing property code parameter" },
        { status: 400 }
      );
    }

    const deletedProperty = await PropertyModel.findOneAndDelete({
      code: { $regex: new RegExp(`^${code}$`, "i") }
    }).lean();

    if (!deletedProperty) {
      return NextResponse.json(
        { error: "Property not found or cannot be deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Property listing deleted successfully",
      code
    });
  } catch (error: any) {
    console.error("DELETE /api/properties failed:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete property listing" },
      { status: 500 }
    );
  }
}
