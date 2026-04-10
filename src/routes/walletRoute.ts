import { Router } from "express";
import { getWallet } from "../controllers/walletController";
import { sessionAuth } from "../middleware/sessionAuth";




const walletRouter=Router();

walletRouter
.get('/',sessionAuth,getWallet)





export default walletRouter