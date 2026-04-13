import { Router } from "express";
import { getWallet,deposit,withdraw,transfer} from "../controllers/walletController";
import { sessionAuth } from "../middleware/sessionAuth";

const walletRouter=Router();


walletRouter
.get('/',sessionAuth,getWallet)
.post('/deposit',sessionAuth,deposit)
.post('/withdraw',sessionAuth,withdraw)
 .post('/transfer',sessionAuth,transfer)




export default walletRouter