import { NextFunction, Request, Response } from "express";
import { Package } from "../../models/package.model";
import { BAD_REQUEST, CREATED, NOT_FOUND, OK } from "http-status";
import { asyncHandler } from "../middlewares/asynchandler";
import { JsonResponse } from "../../util/jsonResponse";
import cloudinary from "../../config/multer";
import Joi from "joi";

const createPackage = asyncHandler(async (req: any, res: Response) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    coverImage: Joi.string().required(),
    details: Joi.string().required(),
    departureTime: Joi.string().required(),
    returnTime: Joi.string().required(),
    travelMode: Joi.string().required(),
    cost: Joi.string().required(),
  });

  const upload = await cloudinary.uploader.upload(req.file.path, {
    public_id: req.file.originalname,
    folder: "wizzy-safaris/images",
  });

  const { error } = schema.validate({...req.body, coverImage: upload.secure_url});
  const newPackage = await Package.create({
    ...req.body,
    coverImage: upload.secure_url,
  });
  return JsonResponse(res, { status: CREATED, newPackage });
});

const updateCoverImage = asyncHandler(async (req: any, res: Response) => {
  const packages = await Package.findById(req.params.id);
  if (!packages)
    return JsonResponse(res, {
      status: NOT_FOUND,
      message: "Package not found can't update cover image",
    });
  const upload = await cloudinary.uploader.upload(req.file.path, {
    public_id: req.file.originalname,
    folder: "wizzy-safaris/images",
  });

  await Package.findByIdAndUpdate(req.params.id, {
    coverImage: upload.secure_url,
  });
  return JsonResponse(res, {
    status: OK,
    coverImage: upload.secure_url,
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
  updateCoverImage,
};
