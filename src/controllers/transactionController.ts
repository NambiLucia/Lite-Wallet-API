import { prisma } from "../lib/prisma";
import { Request, Response } from "express";


export const getTransactionsById = async (req:Request,res:Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const wallet = await prisma.wallet.findUnique({
        where:{userId:req.session.userId}
       
    });
    if(!wallet)return res.status(404).json({ message: "Wallet not found" });

    const [transactions,total]=await Promise.all([
        prisma.transaction.findMany({
            where:{ walletId: wallet.id },
            include: { ledgers:true}, 
            orderBy:{createdAt:"desc"},
            skip,
            take:limit,
        }),
        prisma.transaction.count({ where: { walletId: wallet.id } })
    ])
    return res.status(200).json({
        transactions,
        pagination:{
            total,
            page,
            limit,
            totalPages:Math.ceil(total/limit)
        }

    })
   
  } 
  

  catch (error) {
    console.error("Error fetching Transactions:", error);
    return res.status(500).json({ message: "Failed to fetch transactions" });
  }
};
