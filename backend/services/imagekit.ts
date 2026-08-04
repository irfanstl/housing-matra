import ImageKit from "imagekit";

const IMAGEKIT_PUBLIC_KEY = process.env.IMAGEKIT_PUBLIC_KEY;
const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY;
const IMAGEKIT_URL_ENDPOINT = process.env.IMAGEKIT_URL_ENDPOINT;

if (!IMAGEKIT_PUBLIC_KEY || !IMAGEKIT_PRIVATE_KEY || !IMAGEKIT_URL_ENDPOINT) {
  console.warn(
    "Warning: ImageKit credentials are not completely defined in environment variables. Uploads may fail."
  );
}

const imagekit = new ImageKit({
  publicKey: IMAGEKIT_PUBLIC_KEY || "mock",
  privateKey: IMAGEKIT_PRIVATE_KEY || "mock",
  urlEndpoint: IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/mock",
});

export default imagekit;
