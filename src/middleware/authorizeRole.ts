import { Request, Response, NextFunction } from "express";

export const authorizeRole=(...roles:string[])=>{
return (req: Request, res: Response, next: NextFunction)=>{
    const userRole =req.session.role

    if(!userRole){
         return res.status(401).json({ message: "Unauthorized" });
    }
if(userRole==="Admin"){
    return next()
}
if(!roles.includes(userRole))
    {
        return res.status(403).json({ message: "Access denied" });

}


}




}