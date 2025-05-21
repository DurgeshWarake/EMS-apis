import user from "../models/user.js";
import bcrypt from "bcrypt";
import { response } from "express";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userAuth = await user.findOne({ email });
    if (!userAuth) {
      res.status(404).json({ success: false, error: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, userAuth.password);
    if (!isMatch) {
      res.status(404).json({ success: false, error: "Wrong Password" });
    }

    const token = jwt.sign(
      { _id: userAuth._id, role: userAuth.role },
      process.env.JWT_KEY,
      { expiresIn: "10d" }
    );
    res.status(200).json({
      success: true,
      token: token,
      user: { _id: userAuth._id, name: userAuth.name, role: userAuth.role },
    });
    console.log(response);
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

const verify = (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};
export { login, verify };
