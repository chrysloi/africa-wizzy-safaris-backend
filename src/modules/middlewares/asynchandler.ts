import { INTERNAL_SERVER_ERROR } from "http-status";
import { NextFunction, Request, Response } from "express";
import { JsonResponse } from "../../util/jsonResponse";

// eslint-disable-next-line consistent-return
export const asyncHandler =
  (cb: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await cb(req, res, next);
    } catch (error: any) {
      console.log(error);

      return JsonResponse(res, {
        status: error.status || INTERNAL_SERVER_ERROR,
        error: {
          message: error.errors
            ? error.errors[0] && error.errors[0].message
            : error.message || "An error has occured, Try again",
        },
      });
    }
  };
