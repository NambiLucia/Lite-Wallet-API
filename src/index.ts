import express,{Request,Response} from "express";
import { logger } from "../config/logger";
import cors from "cors"
import authRoute from "./routes/authRoute"
import session from "express-session";

 const app=express();
 

app.use(logger)
 app.use(express.json())
 app.use(express.urlencoded({extended: true}))
 app.use(cors({
     origin: 'http://localhost:3000', // for frontend url
  credentials: true    //for cookies to work
 }))
app.use(session({
secret: process.env.SESSION_SECRET || "secret-key",
  resave: false, // don't save session if nothing changed
  saveUninitialized: false, // don't create session until something is stored
  cookie: {
    httpOnly: true,   // JS in browser cannot access cookie (security)
    secure: false,    // set true in production with HTTPS
    maxAge: 1000 * 60 * 60 //15 mins
  }
}))



 
app.use("/api/v1/auth", authRoute)




app.get('/',(req:Request,res:Response)=>{
    return res.send("<h1>LITE WALLET API IS RUNNING 🏃‍♂️</h1><h3>Your Saving 💳 Journey Starts Here</h3>")
})

 export default app;