import { Router } from "express";
import { userController } from "./user.controller";

const route: Router = Router();

route.post("/", userController.createUser);

export default route;
