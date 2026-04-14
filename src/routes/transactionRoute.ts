import { Router } from "express";
import { getTransactionsById } from "../controllers/transactionController";

import { sessionAuth } from "../middleware/sessionAuth";


const transactionRoute=Router()

transactionRoute
.get('/',sessionAuth,getTransactionsById)




export default transactionRoute