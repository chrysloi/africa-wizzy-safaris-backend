import { Router } from "express";
import { PackageController } from "./package.controller";
import { isAuthenticated } from "../middlewares/auth";
import { upload } from "../../config/multer";

const route: Router = Router();

route.post("/", isAuthenticated, PackageController.createPackage);
route.post(
  "/imageUpload",
  isAuthenticated,
  upload.single("coverImage"),
  PackageController.uploadCoverImage
);
route.delete(
  "/imageDelete/:filename",
  isAuthenticated,
  PackageController.removeCoverImage
);
route.get("/:id", PackageController.getSinglePackage);
route.post("/:id", isAuthenticated, PackageController.addActivities);
route.patch("/:id", isAuthenticated, PackageController.updatePackage);
route.get("/", PackageController.getPackages);

export default route;
