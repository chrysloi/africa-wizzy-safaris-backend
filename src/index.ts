import "dotenv/config";
import mongoose from "mongoose";
import express, { Express, Request, Response } from "express";
import env from "./util/envValidate";
import morgan from "morgan";
import cors from "cors";

// dotenv.config();
const app: Express = express();

const { PORT, MONGODB_URL } = env;

app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", (req: Request, res: Response) => {
  res.send("Welcome to my server");
});

app.use("/**", (req: Request, res: Response) => {
  res.status(404).json({ message: "Not found" });
});

const server = app.listen(PORT, async () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(MONGODB_URL)
    .then(() => {
      console.log("connected to mongodb");
      console.info("you server is running well pn port: ", PORT);
    })
    .catch((err: Error) => {
      console.log(err);
    });
});

export default server;
