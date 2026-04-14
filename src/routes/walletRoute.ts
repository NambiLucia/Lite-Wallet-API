import { Router } from "express";
import { getWallet,deposit,withdraw,transfer} from "../controllers/walletController";
import { sessionAuth } from "../middleware/sessionAuth";
import { schemaValidator } from "../middleware/schemaValidator";
import { depositSchema,withdrawSchema,transferSchema } from "../middleware/joi-schemas";



const walletRouter=Router();


walletRouter
.get('/',sessionAuth,getWallet)
.post('/deposit',sessionAuth,schemaValidator(depositSchema),deposit)
.post('/withdraw',sessionAuth,schemaValidator(withdrawSchema),withdraw)
 .post('/transfer',sessionAuth,schemaValidator(transferSchema),transfer)




export default walletRouter