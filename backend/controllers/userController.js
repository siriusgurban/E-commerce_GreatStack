import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email already registered" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email address" });
    }
    if (!validator.isStrongPassword(password)) {
      return res.json({ success: false, message: "Password must be strong" });
    }

    const salt = await bcrypt.genSalt(10); // ✅ correct
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    console.log(newUser, "newUser");

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const adminLogin = async (req, res) => {};

export { userLogin, userRegister, adminLogin };
