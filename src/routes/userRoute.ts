import { Router } from "express";
import { getUsers,updateUserById } from "../controllers/userController";


const userRoute=Router()

userRoute
.get('/',getUsers)
.patch('/:id',updateUserById)

export default userRoute;