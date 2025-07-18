import productModel from "../models/productModel.js";

//add Product

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      image,
      category,
      subCategory,
      sizes,
      bestseller,
      date,
    } = req.body;

    const newProduct = new productModel({
      name,
      description,
      price,
      image,
      category,
      subCategory,
      sizes,
      bestseller,
      date,
    });

    const product = await newProduct.save(newProduct);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//get all Product

const getAllProduct = async (req, res) => {
  try {
    const products = await productModel.find()
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//remove Product

const removeProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//get Product by id

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//update Product by id

const updateProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
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
