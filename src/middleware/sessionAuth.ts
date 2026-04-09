import { Request, Response, NextFunction } from "express";

export const sessionAuth=(req: Request, res: Response, next: NextFunction)=>{
    
    if(!req.session.userId){
        return res.status(401).json({ message: "Unauthorized. Please login." });

    }
 next();
}