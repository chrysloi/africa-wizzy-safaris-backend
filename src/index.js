import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const { PORT, MONGODB_URL } = process.env;

app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", (req, res) => {
  res.status(200).json({ message: "welcome to my server" });
});

app.use("/**", (req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

const server = app.listen(PORT, () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected to mongodb");
      console.info("you server is running well pn port: ", PORT);
    })
    .catch((err) => {
      console.log(err);
    });
});

export default server;
