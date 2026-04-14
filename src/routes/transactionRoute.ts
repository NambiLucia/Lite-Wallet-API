import { Router } from "express";
import { getTransactionsById } from "../controllers/transactionController";
import { sessionAuth } from "../middleware/sessionAuth";
import { authorizeRole } from "../middleware/authorizeRole";

const transactionRoute=Router()

transactionRoute
.get('/',sessionAuth,authorizeRole("Admin","User"),getTransactionsById)




export default transactionRoute