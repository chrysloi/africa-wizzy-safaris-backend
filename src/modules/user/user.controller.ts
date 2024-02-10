import { user } from "../../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../middlewares/asynchandler";
import env from "../../util/envValidate";
import { JsonResponse } from "../../util/jsonResponse";
import { BAD_REQUEST } from "http-status";

const createUser = asyncHandler(async (req: Request, res: Response) => {
  const emailExists = await user.findOne({ email: req.body.email });
  if (emailExists)
    return JsonResponse(res, {
      message: "Email already exists",
      status: BAD_REQUEST,
    });
  req.body.password = await bcrypt.hash(req.body.password, 10);
  const newUser = await user.create(req.body);
  return JsonResponse(res, {
    newUser,
    message: "User created successfully",
    status: 201,
  });
});

const login = asyncHandler(async (req: Request, res: Response) => {
  const login_user = await user.findOne({ email: req.body.email });
  if (!login_user)
    return JsonResponse(res, {
      message: "User doesn't exists",
      status: BAD_REQUEST,
    });

  const validPassword = await bcrypt.compare(
    req.body.password,
    login_user.password
  );
  if (!validPassword)
    return JsonResponse(res, {
      message: "Invalid password",
      status: BAD_REQUEST,
    });

  const token = jwt.sign(
    { _id: login_user._id, role: login_user.role },
    env.TOKEN_SECRET,
    { expiresIn: "30d" }
  );

  return JsonResponse(res, {
    login_user,
    token,
    message: "User Login successfully",
    status: 201,
  });
});

// const updateProfile = asyncHandler(async (req: any, res: Response) => {
//   const loggedin_user = await user.find(req.user.userId);

//   return JsonResponse(res, {
//     message: "Profile updated successfully",
//     status: 201,
//   });
// });

export const userController = { createUser, login };
