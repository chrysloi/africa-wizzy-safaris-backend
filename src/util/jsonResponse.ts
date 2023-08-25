import { Response } from "express";

const JsonResponseWrapper = (res: Response, data: any) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  res.status(data.status).json({ ...data });

export default JsonResponseWrapper;
