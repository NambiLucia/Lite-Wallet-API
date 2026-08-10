import { Router } from "express";
import { getTransactionsById } from "../controllers/transactionController.js";
import { sessionAuth } from "../middleware/sessionAuth.js";
import { authorizeRole } from "../middleware/authorizeRole.js";

const transactionRoute=Router()

transactionRoute
.get('/',sessionAuth,authorizeRole("Admin","User"),getTransactionsById)




export default transactionRoute