import { prisma } from "../lib/prisma.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
  try {
    const { full_name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          full_name,
          email,
          password: hashedPassword,
        },
      });

      const wallet = await tx.wallet.create({
        data: {
          userId: newUser.id,
        },
      });

      return { newUser, wallet };
    });

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: result.newUser.id,
        full_name: result.newUser.full_name,
        email: result.newUser.email,
        role: result.newUser.role,
      },
      wallet: result.wallet,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Failed to create user" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    return res.status(401).json({ error: "Wrong Password" });
  }
  //store session
  req.session.userId = user.id as string;
  req.session.email = user.email as string;
  req.session.role = user.role as string;

  return res.status(200).json({
    message: "Login successful",
    user: {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
    },
  });
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("connect.sid"); //clear session cookie
    return res.status(200).json({ message: "Logged out successfully" });
  });
};
