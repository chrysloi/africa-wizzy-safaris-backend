import jwt from "jsonwebtoken";
import env from "../../util/envValidate";
import { JsonResponse } from "../../util/jsonResponse";
import { asyncHandler } from "./asynchandler";
import { FORBIDDEN, UNAUTHORIZED } from "http-status";

export const isAuthenticated = asyncHandler(
  async (req: any, res: any, next: any) => {
    const authHeader = req.header("Authorization") || req.header("token");
    console.log(authHeader, "authHeader");

    if (!authHeader) {
      return JsonResponse(res, {
        status: UNAUTHORIZED,
        message: "Unauthorized: Missing invalid token.",
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return JsonResponse(res, {
        status: UNAUTHORIZED,
        message: "Invalid token format.",
      });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, env.TOKEN_SECRET, (err: any, user: any) => {
      if (err) {
        return JsonResponse(res, {
          status: UNAUTHORIZED,
          message: "Invalid token format.",
          error: err,
        });
      }
      req.user = user;
      next();
    });
  }
);

export const isAdmin = asyncHandler(async (req: any, res: any, next: any) => {
  if (req.user.role !== "admin") {
    return JsonResponse(res, {
      status: FORBIDDEN,
      message: "Forbidden: You are not authorized to access this route.",
    });
  }
  next();
});

export const isUser = asyncHandler(async (req: any, res: any, next: any) => {
  if (req.user.role !== "user") {
    return JsonResponse(res, {
      status: FORBIDDEN,
      message: "Forbidden: You are not authorized to access this route.",
    });
  }
  next();
});
