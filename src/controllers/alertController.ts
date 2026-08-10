import { prisma } from "../lib/prisma.js";
import { Request, Response } from "express";

export const getAlerts = async (req: Request, res: Response) => {
  try {
    const alerts = await prisma.alert.findMany({
      where: { userId: req.session.userId as string },
      orderBy: { createdAt: "desc" },
    });
    const unreadAlertCount = alerts.filter((alert) => alert.isRead === false);

    return res.status(200).json({
      data: {
        alerts,
        "Unread Alerts Count": unreadAlertCount,
      },
    });
  } catch (error) {
    console.error("Error fetching alerts:", error);
    return res.status(500).json({ message: "Failed to fetch alerts" });
  }
}

  export const markAlertAsRead = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const alert = await prisma.alert.findUnique({
        where: {
          id: id as string,
        },
      });
      if (!alert) return res.status(404).json({ message: "Alert not found" });

      if (alert.userId !== req.session.userId) {
        return res.status(403).json({ message: "Access denied" });
      }

      const updatedAlert = await prisma.alert.update({
        where: { id: id as string },
        data: { isRead: true },
      });

      return res.status(200).json({
        message: "Alert marked as read",
        data: {
          alert: updatedAlert,
        },
      });
    } catch (error) {
      console.error("Failed to mark Alert as Read", error);

      return res.status(500).json({
        message: "Failed to mark alert as read",
      });
    }
  };
  
export const sendSystemAlert = async (req: Request, res: Response) => {
  try {
    const { userId, message } = req.body;

    if (!userId || !message) {
      return res.status(400).json({ message: "userId and message are required" });
    }


    const user = await prisma.user.findUnique({ where: { id: userId } });
    
    if (!user) return res.status(404).json({ message: "User not found" });

    const alert = await prisma.alert.create({
      data: {
        userId,
        type: "System",
        message,
      },
    });

    return res.status(201).json({
      message: "System alert sent successfully",
      data:alert,
    });
  } catch (error) {
    console.error("Error sending system alert:", error);
    return res.status(500).json({ message: "Failed to send system alert" });
  }
};
