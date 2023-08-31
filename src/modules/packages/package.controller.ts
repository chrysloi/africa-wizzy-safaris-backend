import { NextFunction, Request, Response } from "express";
import { Package } from "../../models/package.model";
import { BAD_REQUEST, NOT_FOUND, OK } from "http-status";
import { asyncHandler } from "../middlewares/asynchandler";
import { JsonResponse } from "../../util/jsonResponse";
import path from "path";
import fs from "fs";

const createPackage = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.body);

  const newPackage = await Package.create(req.body);
  return JsonResponse(res, { status: OK, newPackage });
});

const uploadCoverImage = asyncHandler(async (req: any, res: Response) => {
  const url = req.headers.host + `/images/${req.file.originalname}`;

  return JsonResponse(res, {
    status: OK,
    url,
  });
});

const removeCoverImage = asyncHandler(async (req: Request, res: Response) => {
  const uploadsDirectory = "uploads/images";
  const filename = req.params.filename;
  const filePath = path.join(uploadsDirectory, filename);

  fs.unlink(filePath, (err: any) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting the image.");
    } else {
      res.send("Image deleted successfully.");
    }
  });

  return JsonResponse(res, {
    status: OK,
    message: "Image deleted successfully",
  });
});

const getPackages = asyncHandler(async (req: Request, res: Response) => {
  const packages = await Package.find();
  return JsonResponse(res, { status: OK, packages });
});

const getSinglePackage = asyncHandler(async (req: Request, res: Response) => {
  const packages = await Package.findById(req.params.id);
  return JsonResponse(res, { status: OK, package: packages });
});

const addActivities = asyncHandler(async (req: Request, res: Response) => {
  const packages = await Package.findById(req.params.id);
  if (!packages)
    return JsonResponse(res, {
      status: NOT_FOUND,
      message: "Package not found",
    });
  // packages.days[req.body.day].included?.push(req.body.activity);
  const exists = packages.days.filter((day) => day.day === req.body.day);
  if (exists.length > 0)
    return JsonResponse(res, {
      status: BAD_REQUEST,
      message: "Please choose another day",
    });
  packages.days.push(req.body);
  packages.daysNumber = packages.daysNumber + 1;
  await packages.save();
  return JsonResponse(res, {
    status: OK,
    message: "Activity added successfully",
  });
});

const updatePackage = asyncHandler(async (req: any, res: Response) => {
  const packages = await Package.findById(req.params.id);
  if (!packages)
    return JsonResponse(res, {
      status: NOT_FOUND,
      message: "Package not found",
    });

  delete req.body.days;

  await Package.findByIdAndUpdate(req.params.id, req.body);
  return JsonResponse(res, {
    status: OK,
    message: "Package updated successfully",
  });
});

export const PackageController = {
  createPackage,
  getPackages,
  getSinglePackage,
  addActivities,
  updatePackage,
  uploadCoverImage,
  removeCoverImage,
};
