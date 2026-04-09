import {prisma} from "../lib/prisma"
import { Request,Response } from "express";

const refCode=`TRX-${Date.now()}-${Math.floor(Math.random()* 1000)}`

export const getWallet = async(req:Request,res:Response)=>{
try{
    const wallet = await prisma.wallet.findUnique({
        where:{
            userId: req.session.userId
       },
        include:{
            transactions:{
                 orderBy: { 
                    createdAt: "desc" 
                }
            },
            ledgers:true
        }
    })
    if (!wallet){
        return res.status(404).json({
            message:"Wallet not found"
        })
    }
 return res.status(200).json({Message:"Wallet successfully retrieved", data: wallet });
    


}
catch(error){
 console.error("Error retrieving Walllet:", error);
       return res.status(500).json({ error: "Failed to Retrieve wallet" });
}
}
