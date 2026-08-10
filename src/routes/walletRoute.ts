import { Router } from "express";
import { getWallet,deposit,withdraw,transfer} from "../controllers/walletController.js";
import { sessionAuth } from "../middleware/sessionAuth.js";
import { schemaValidator } from "../middleware/schemaValidator.js";
import { depositSchema,withdrawSchema,transferSchema } from "../middleware/joi-schemas.js";
import { authorizeRole } from "../middleware/authorizeRole.js";



const walletRouter=Router();


walletRouter
.get('/',sessionAuth,authorizeRole("Admin","User"),getWallet)
.post('/deposit',sessionAuth,schemaValidator(depositSchema),deposit)
.post('/withdraw',sessionAuth,schemaValidator(withdrawSchema),withdraw)
 .post('/transfer',sessionAuth,schemaValidator(transferSchema),transfer)




export default walletRouter