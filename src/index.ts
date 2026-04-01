import express,{Request,Response} from "express";
import { logger } from "../config/logger";
import cors from "cors"

 const app=express();
 

app.use(logger)
 app.use(express.json())
 app.use(express.urlencoded({extended: true}))
 app.use(cors())

 


app.get('/',(req:Request,res:Response)=>{
    return res.send("<h1>LITE WALLET API IS RUNNING 🏃‍♂️</h1><h3>Your Saving 💳 Journey Starts Here</h3>")
})

 export default app;