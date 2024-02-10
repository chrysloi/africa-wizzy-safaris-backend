import { Router } from "express";
import { userController } from "./user.controller";

const route: Router = Router();

route.post("/register", userController.createUser);
route.post("/login", userController.login);

export default route;
