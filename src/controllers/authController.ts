import {prisma} from "../lib/prisma"
import { Request,Response } from "express";
import bcrypt from "bcrypt";


export const register=async(req:Request,res:Response)=>{
    try{
        const {full_name,email,password} =req.body;
       
const existingUser = await prisma.user.findUnique({
    where:{email}
})
if(existingUser){
     return res.status(400).json({ message: "Email already in use" });
}

const hashedPassword= await bcrypt.hash(password,10)

        const newUser=await prisma.user.create({
            data:{
                full_name,
                email,
                password: hashedPassword,
            }
        })
        return res.status(201).json({
             message: "User created successfully",
 
      user: {
        id: newUser.id,
        full_name: newUser.full_name,
        email: newUser.email,
        role: newUser.role,
      }

        })
    }
    catch(error){
         console.error("Error creating user:", error);
       return res.status(500).json({ error: "Failed to create user" });

    }
}