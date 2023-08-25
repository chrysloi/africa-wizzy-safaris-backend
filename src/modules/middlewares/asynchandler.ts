import { INTERNAL_SERVER_ERROR } from "http-status";
import JsonResponseWrapper from "../utils/jsonResponse";
import { NextFunction, Request, Response } from "express";

// eslint-disable-next-line consistent-return
const asyncHandler =
  (cb: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await cb(req, res, next);
    } catch (error: any) {
      return JsonResponseWrapper(res, {
        status: error.status || INTERNAL_SERVER_ERROR,
        error: {
          message: error.errors
            ? error.errors[0] && error.errors[0].message
            : error.message || "An error has occured, Try again",
        },
      });
    }
  };

export default asyncHandler;
