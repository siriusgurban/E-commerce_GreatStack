import express from "express";
import {
  addProduct,
  getAllProduct,
  removeProduct,
  getProductById,
  updateProductById,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post(
  "/create",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.get("/getAll", getAllProduct);
productRouter.post("/remove", adminAuth, removeProduct);
productRouter.get("/getById", getProductById);
productRouter.post("/update", updateProductById);

export default productRouter;
