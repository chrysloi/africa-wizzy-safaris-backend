import { Response } from "express";

export const JsonResponse = (res: Response, data: any) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  res.status(data.status).json({ ...data });
