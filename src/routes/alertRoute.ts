import { Router } from "express";
import { getAlerts,markAlertAsRead,sendSystemAlert} from "../controllers/alertController.js";
import { sessionAuth } from "../middleware/sessionAuth.js";
import { authorizeRole } from "../middleware/authorizeRole.js";



const alertRoute =Router()


alertRoute
.get("/",sessionAuth,getAlerts)
.patch("/:id",markAlertAsRead)
.post("/system",sessionAuth,authorizeRole("Admin"),sendSystemAlert);


export default alertRoute