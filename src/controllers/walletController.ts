import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

const refCode = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

export const getWallet = async (req: Request, res: Response) => {
  try {
    const wallet = await prisma.wallet.findUnique({
      where: {
        userId: req.session.userId,
      },
      include: {
        transactions: {
          orderBy: {
            createdAt: "desc",
          },
        },
        ledgers: true,
      },
    });
    if (!wallet) {
      return res.status(404).json({
        message: "No Wallet found for current user",
      });
    }
    return res
      .status(200)
      .json({ Message: "Wallet successfully retrieved", data: wallet });
  } catch (error) {
    console.error("Error retrieving Walllet:", error);
    return res.status(500).json({ error: "Failed to Retrieve wallet" });
  }
};


export const deposit = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number" });
    }

    const depositAmount = Number(amount);
    const wallet = await prisma.wallet.findUnique({
      where: {
        userId: req.session.userId,
      },
    });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    if (wallet.status !== "Active")
      return res.status(403).json({ message: "Wallet is not active" });

    const result = await prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.create({
        data: {
          type: "Deposit",
          amount: depositAmount,
          referenceCode: refCode("DEP"),
          status: "Completed",
          walletId: wallet.id,
        },
      });

      await tx.ledger.create({
        data: {
          credit: depositAmount,
          debit: 0,
          balanceAfter: wallet.balance + depositAmount,
          walletId: wallet.id,
          transactionId: transaction.id,
        },
      });

      const updatedWallet = await tx.wallet.update({
        where: { id: wallet.id },
        data: {
          balance: {
            increment: depositAmount,
          },
        },
      });
      return { transaction, updatedWallet };
    });

    return res.status(200).json({
      message: "Your Deposit is Successful🎉🎉🎉. Thank you for depositing with us",
      transaction: result.transaction,
      newBalance: result.updatedWallet.balance,
    });
  } catch (error) {
    console.error("Error making a Deposit:", error);
    return res.status(500).json({ message: "Failed to make  a Deposit" });
  }
};



export const withdraw = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number" });
    }

    const withdrawAmount = Number(amount);
    const wallet = await prisma.wallet.findUnique({
      where: {
        userId: req.session.userId,
      },
    });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    if (wallet.status !== "Active")
      return res.status(403).json({ message: "Wallet is not active" });

    //insufficient funds
    if(wallet.balance < withdrawAmount){
        return res.status(400).json({
            message: "Insufficient funds",
            currentBalance:wallet.balance
        })

    }

    const result = await prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.create({
        data: {
          type: "Withdraw",
          amount: withdrawAmount,
          referenceCode: refCode("WDR"),
          status: "Completed",
          walletId: wallet.id,
        },
      });

      await tx.ledger.create({
        data: {
          debit: withdrawAmount,
          credit: 0,
          balanceAfter: wallet.balance - withdrawAmount,
          walletId: wallet.id,
          transactionId: transaction.id,
        },
      });

      const updatedWallet = await tx.wallet.update({
        where: { id: wallet.id },
        data: {
          balance: {
            decrement: withdrawAmount,
          },
        },
      });
      return { transaction, updatedWallet };
    });

    return res.status(200).json({
      message: "Your Withdraw was Successful🎉🎉🎉",
      transaction: result.transaction,
      newBalance: result.updatedWallet.balance,
    });
  } catch (error) {
    console.error("Error making a Deposit:", error);
    return res.status(500).json({ message: "Failed to make  a Deposit" });
  }
};




export const transfer = async (req: Request, res: Response) => {
  try {
 if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { amount, receivingEmail } = req.body;
 
  
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({ message: "Amount must be a positive number" });
    }
    if (!receivingEmail) {
      return res.status(400).json({ message: "Receiving email is required" });
    }
 
    const transferAmount = Number(amount);
 
    //  Find sender's wallet first and verify everything
    const senderWallet = await prisma.wallet.findUnique({
      where: { userId: req.session.userId },
    });
 
    if (!senderWallet) return res.status(404).json({ message: "Your wallet was not found" });

    if (senderWallet.status !== "Active") return res.status(403).json({ message: "Your wallet is not Active" });

    if (senderWallet.balance < transferAmount) {
      return res.status(400).json({ message: "You have Insufficient funds!!!", currentBalance: senderWallet.balance });
    }
   
 
    // find Receiver user by email
    const receivingUser = await prisma.user.findUnique({
      where:{
        email:receivingEmail
      },
      include:{
        wallet:true
      }
    })

    if(!receivingUser)return res.status(404).json({ message: "Receiver not found!!!!" });
   
      if (!receivingUser.wallet) return res.status(404).json({ message: "Recipient has no wallet" });
    if (receivingUser.wallet.status !== "Active") {
      return res.status(400).json({ message: "Recipient wallet is not active" });
    }
        
    // Block any self transfers
    if(receivingUser.id === req.session.userId){
      return res.status(400).json({ message: "You cannot transfer to yourself" });
    }
    
    const receivingWallet =receivingUser.wallet

    const sharedRef = refCode("TRF");

    const result =await prisma.$transaction(async(tx)=>{
//money leaves Sender wallet
const senderTransaction = await tx.transaction.create({
  data:{
    type:"Transfer",
    amount:transferAmount,
    referenceCode:`${sharedRef}-OUT`,
    status:"Completed",
    walletId:senderWallet.id
  }
})

//money arrives in Receiver's wallet
const receiverTransaction = await tx.transaction.create({
  data:{
    type:"Transfer",
    amount:transferAmount,
    referenceCode:`${sharedRef}-IN`,
    status:"Completed",
    walletId:receivingWallet.id
  }
})

//Debit Sender's ledger
await tx.ledger.create({
  data:{
    debit:transferAmount,
    credit:0,
    balanceAfter:senderWallet.balance-transferAmount,
    walletId:senderWallet.id,
    transactionId:senderTransaction.id,
  }

})


//Credit Receiver's ledger
await tx.ledger.create({
  data:{
    debit:0,
    credit:transferAmount,
    balanceAfter:receivingWallet.balance+ transferAmount,
    walletId:receivingWallet.id,
    transactionId:receiverTransaction.id,
  }

})

//update sender wallet with reduced amount
const updatedSenderWallet = await tx.wallet.update({
  where:{
    id:senderWallet.id
  },
  data:{
    balance:{decrement:transferAmount}
  }
})


//update receiver wallet with reduced amount
const updatedReceiverWallet = await tx.wallet.update({
  where:{
    id:receivingWallet.id
  },
  data:{
    balance:{increment:transferAmount}
  }
})

 return { senderTransaction, updatedSenderWallet };

    })

     return res.status(200).json({
      message: `Transfer of ${transferAmount} UGX to ${receivingEmail} was successful`,
      transaction: result.senderTransaction,
      newBalance: result.updatedSenderWallet.balance,
    });
    
 
  } catch(error){
 console.error("Error Transferring money:", error);
    return res.status(500).json({ error: "Failed to Transfer Money!!!" });
  }
};

