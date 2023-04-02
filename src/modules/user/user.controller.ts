import { user } from "../../models/user.model";
import { Request, Response } from "express";

class userController {
  static async createUser(req: Request, res: Response) {
    try {
      const newUser = await user.create(req.body);
      return res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
}

export { userController };
