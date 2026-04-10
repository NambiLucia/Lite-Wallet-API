import { Router } from "express";
import { getWallet,deposit,withdraw} from "../controllers/walletController";
import { sessionAuth } from "../middleware/sessionAuth";




const walletRouter=Router();

walletRouter
.get('/',sessionAuth,getWallet)
.post('/deposit',sessionAuth,deposit)
.post('/withdraw',sessionAuth,withdraw)
 




export default walletRouter