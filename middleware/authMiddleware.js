import jwt from "jsonwebtoken";
import User from "../models/user.js";

const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "Authorization header missing or malformed",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(404)
        .json({ success: false, error: "Token Not Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded) {
      return res.status(404).json({ success: false, error: "Token Not Valid" });
    }

    const userAuth = await User.findById({ _id: decoded._id }).select(
      "-password"
    );
    if (!userAuth) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    req.user = userAuth;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

export default verifyUser;
