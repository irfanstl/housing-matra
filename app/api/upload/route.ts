import { NextRequest, NextResponse } from "next/server";
import imagekit from "@/backend/services/imagekit";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const fileName = formData.get("fileName") as string | null;

    if (!file || !fileName) {
      return NextResponse.json(
        { error: "Missing file or fileName in request" },
        { status: 400 }
      );
    }

    // Convert standard File/Blob into a Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload using ImageKit Node SDK
    const response = await imagekit.upload({
      file: buffer, // Accept Buffer representation
      fileName: fileName,
      folder: "/housing-matra",
    });

    return NextResponse.json({ url: response.url });
  } catch (error: any) {
    console.error("ImageKit Upload API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload file to ImageKit" },
      { status: 500 }
    );
  }
}
