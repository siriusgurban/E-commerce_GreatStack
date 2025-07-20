import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

//add Product

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      image: imagesUrl,
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      date: Date.now(),
    };

    const newProduct = new productModel(productData);

    await newProduct.save();
    res.status(201).json({ success: true, message: "Product Added" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//get all Product

const getAllProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//remove Product

const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, message: "Product Removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//get Product by id

const getProductById = async (req, res) => {
  try {
    const {productId} = req.body;
    const product = await productModel.findById(productId);
    
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//update Product by id

const updateProductById = async (req, res) => {
  try {
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export {
  addProduct,
  getAllProduct,
  removeProduct,
  getProductById,
  updateProductById,
};
