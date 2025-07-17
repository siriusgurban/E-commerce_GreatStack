import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";

//App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB(); // we call mongo database here
connectCloudinary(); // and the same here

//middleware
app.use(express.json());
app.use(cors());

//api endpoint

app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Api Woking");
});

app.listen(port, () => console.log("Port listening", +port));
