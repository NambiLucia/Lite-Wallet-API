import { Router } from "express";
import { register } from "../controllers/authcontroller";
const router =Router()


router
.post("/register",register);

export default router