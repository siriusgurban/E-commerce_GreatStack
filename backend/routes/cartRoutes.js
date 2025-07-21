import express from "express";

import {
  addToCart,
  updateCart,
  getUserCart,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/add", addToCart);
cartRouter.put("/update", updateCart);
cartRouter.get("/get", getUserCart);

export default cartRouter;
