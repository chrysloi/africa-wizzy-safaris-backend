import { Router } from "express";
import { PackageController } from "./package.controller";

const route: Router = Router();

route.post("/", PackageController.createPackage);
route.post("/:id", PackageController.addActivities);
route.get("/", PackageController.getPackages);

export default route;
