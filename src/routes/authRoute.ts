import { Router } from "express";
import { register,login,logout } from "../controllers/authController.js"
import { sessionAuth } from "../middleware/sessionAuth.js";

const authRoute =Router()


authRoute
.post("/register",register)
.post("/login",login)
.post("/logout",sessionAuth,logout);


export default authRoute