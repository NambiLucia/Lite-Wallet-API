import { Router } from "express";
import { getAlerts,markAlertAsRead,sendSystemAlert} from "../controllers/alertController";
import { sessionAuth } from "../middleware/sessionAuth";
import { authorizeRole } from "../middleware/authorizeRole";



const alertRoute =Router()


alertRoute
.get("/",sessionAuth,getAlerts)
.patch("/:id",markAlertAsRead)
.post("/system",sessionAuth,authorizeRole("Admin"),sendSystemAlert);


export default alertRoute