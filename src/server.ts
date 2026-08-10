import app from "./index.js"
import "dotenv/config"; 

const PORT = process.env.PORT || 4900

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})