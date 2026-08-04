import { NextApiRequest, NextApiResponse } from "next";
import imagekit from "@/backend/services/imagekit";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { file, fileName } = req.body;

    if (!file || !fileName) {
      return res.status(400).json({ error: "Missing base64 file data or fileName in request" });
    }

    // Upload using ImageKit Node SDK
    const response = await imagekit.upload({
      file: file, // Accept base64 string
      fileName: fileName,
      folder: "/housing-matra",
    });

    return res.status(200).json({ url: response.url });
  } catch (error: any) {
    console.error("ImageKit Upload API error:", error);
    return res.status(500).json({ error: error.message || "Failed to upload file to ImageKit" });
  }
}
