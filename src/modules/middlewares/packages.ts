import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { asyncHandler } from "./asynchandler";

export const createPackageValidationMiddleware = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      coverImage: Joi.string().required(),
      details: Joi.string().required(),
      departureTime: Joi.string().required(),
      returnTime: Joi.string().required(),
      travelMode: Joi.string().required(),
      cost: Joi.string().required(),
    });
    const { error, value } = schema.validate({
      ...req.body,
      coverImage: req.file.path,
    });
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
    req.body = value;

    next();
  }
);
