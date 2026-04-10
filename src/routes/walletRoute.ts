import { Router } from "express";
import { getWallet,deposit} from "../controllers/walletController";
import { sessionAuth } from "../middleware/sessionAuth";




const walletRouter=Router();

walletRouter
.get('/',sessionAuth,getWallet)
.post('/deposit',sessionAuth,deposit)





export default walletRouter