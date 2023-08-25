import { NextFunction, Request, Response } from "express";
import { Package } from "../../models/package.model";
import { BAD_REQUEST } from "http-status";

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
  static async addActivities(req: Request, res: Response, next: NextFunction) {
    try {
      const packages = await Package.findById(req.params.id);
      if (!packages) return res.status(BAD_REQUEST).json("package not found");
      // packages.days[req.body.day].included?.push(req.body.activity);
      const exists = packages.days.filter((day) => day.day === req.body.day);
      if (exists.length > 0)
        return res.status(BAD_REQUEST).json("Please choose another day");
      packages.days.push(req.body);
      await packages.save();
      return res.status(200).json(packages);
    } catch (error) {
      next(error);
    }
  }
}

export { PackageController };
