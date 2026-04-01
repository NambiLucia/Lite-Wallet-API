import {prisma} from "../lib/prisma"
import { Request,Response } from "express";


export const register=async(req:Request,res:Response)=>{
    try{
        const {full_name,email,password} =req.body;
        const newUser=await prisma.user.create({
            data:{
                full_name,
                email,
                password
            }
        })
        return res.status(200).json({message:"User created successfully",data:newUser})
    }
    catch(error){
        console.error(error)
        return res.status(500).json("Error creating user")

    }
}