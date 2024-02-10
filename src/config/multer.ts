import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

const storage = multer.diskStorage({});

const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  private_cdn: true,
});

export default cloudinary;
export const upload = multer({ storage });
