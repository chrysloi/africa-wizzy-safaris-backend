import { Router } from "express";
import { PackageController } from "./package.controller";
import { isAuthenticated } from "../middlewares/auth";
import { upload } from "../../config/multer";
import { createPackageValidationMiddleware } from "../middlewares/packages";

const route: Router = Router();

route.post(
  "/",
  isAuthenticated,
  upload.single("coverImage"),
  createPackageValidationMiddleware,
  PackageController.createPackage
);
route.get("/:id", PackageController.getSinglePackage);
route.post("/:id", isAuthenticated, PackageController.addActivities);
route.patch("/:id", isAuthenticated, PackageController.updatePackage);
route.patch(
  "/:id/updateImage",
  isAuthenticated,
  upload.single("coverImage"),
  PackageController.updateCoverImage
);
route.get("/", PackageController.getPackages);

export default route;
