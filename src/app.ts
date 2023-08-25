import "dotenv/config";
import express, { Express, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { options } from "./swagger/index";
import userRoutes from "./modules/user/userRoutes";
import packageRoutes from "./modules/packages/packageRoutes";

const app: Express = express();

app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/welcome", (req: Request, res: Response) => {
  res.send("Welcome to my server");
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(options.definition));
app.use("/user", userRoutes);
app.use("/package", packageRoutes);

app.use("/**", (req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  //   console.error(error);
  let errorMessage = "An unknown error occurred";
  if (error instanceof Error) errorMessage = error.message;
  return res.status(500).json({ errorMessage });
});

export default app;
