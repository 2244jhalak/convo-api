import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { UserModel } from "./user.model";

const JWT_SECRET= process.env.JWT_SECRET!


export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    console.log(JWT_SECRET)

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({ userId: user._id, token });

  } catch (error: any) {
    console.error("Register error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error?.message || "Unknown error"
    });
  }
};


export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    console.log("JWT_SECRET: from login", JWT_SECRET);
    res.status(200).json({ userId: user._id, token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};