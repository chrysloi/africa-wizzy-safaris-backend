import { NextFunction, Request, Response } from "express";
import { Package } from "../../models/package.model";

class PackageController {
  static async createPackage(req: Request, res: Response, next: NextFunction) {
    try {
      const newPackage = await Package.create(req.body);
      return res.status(201).json(newPackage);
    } catch (error) {
      next(error);
    }
  }

  static async getPackages(req: Request, res: Response, next: NextFunction) {
    try {
      const packages = await Package.find();
      return res.status(200).json(packages);
    } catch (error) {
      next(error);
    }
  }
}

export { PackageController };
