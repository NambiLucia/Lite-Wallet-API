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
