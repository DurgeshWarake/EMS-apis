import user from "../models/user.js";
import bcrypt from "bcrypt";
import { response } from "express";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userAuth = await user.findOne({ email });
    console.log("svtg",userAuth)
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


const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign(
      { _id: newUser._id, role: newUser.role },
      process.env.JWT_KEY,
      { expiresIn: "10d" }
    );

    res.status(201).json({
      success: true,
      token,
      user: { _id: newUser._id, name: newUser.name, role: newUser.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const verify = (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};
export { login, verify,signup };
