import { Router } from "express";
import { register,login,logout } from "../controllers/authController"
import { sessionAuth } from "../middleware/sessionAuth";

const authRoute =Router()


authRoute
.post("/register",register)
.post("/login",login)
.post("/logout",sessionAuth,logout);
export default authRoute