import {prisma} from "../lib/prisma.js"
import { Request,Response } from "express";

export const getUsers = async (req:Request,res:Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const users = await prisma.user.findMany({
        where:{
            deletedAt:null
        },
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({ Message:"All Users" , data:users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const updateUserById = async (req:Request, res:Response) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: req.params.id as string,
      },
      data: req.body,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ message: `User updated`, data: updatedUser });

  } catch (error) {
    console.error("Update error:", error);

    return res.status(500).json({ message: "Failed to update user"});
  }
};
 

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const deletedUser = await prisma.user.update({
      where: {
        id: req.params.id as string,
      },
      data: {
        deletedAt: new Date(), 
      },
    });

    return res.status(200).json({
      message: "User successfully deleted",
      data: deletedUser,
    });

  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({ message: "Failed to delete user" });
  }
};





