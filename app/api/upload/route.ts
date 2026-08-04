import { NextRequest, NextResponse } from "next/server";
import imagekit from "@/backend/services/imagekit";

export async function POST(request: NextRequest) {
  try {
    const { file, fileName } = await request.json();

    if (!file || !fileName) {
      return NextResponse.json(
        { error: "Missing base64 file data or fileName in request" },
        { status: 400 }
      );
    }

    // Upload using ImageKit Node SDK
    const response = await imagekit.upload({
      file: file, // Accept base64 string
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
