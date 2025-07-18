import express from 'express';
import {
  addProduct,
  getAllProduct,
  removeProduct,
  getProductById,
  updateProductById,
} from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post("/create", addProduct);
productRouter.get("/getAll", getAllProduct);
productRouter.post("/remove", removeProduct);
productRouter.get("/getById", getProductById);
productRouter.post("/update", updateProductById);

export default productRouter;