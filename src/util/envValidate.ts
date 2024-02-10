import { cleanEnv } from "envalid";
import { str, port } from "envalid/dist/validators";

export default cleanEnv(process.env, {
  PORT: port(),
  MONGODB_URL: str(),
  TOKEN_SECRET: str(),
  CLOUDINARY_NAME: str(),
  CLOUDINARY_API_KEY: str(),
  CLOUDINARY_API_SECRET: str(),
});
