import { Router } from "express";
import { getUsers,updateUserById,deleteUserById } from "../controllers/userController";


const userRoute=Router()

userRoute
.get('/',getUsers)
.patch('/:id',updateUserById)
.delete('/:id',deleteUserById)
export default userRoute;