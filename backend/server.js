import express from "express";
import dotenv from "dotenv"
import {connectDB} from "./config/db.js"
import todoRoute from "./routes/todo.route.js";
const PORT = process.env.PORT || 3000

dotenv.config()

const app = express()

app.use(express.json())
    

app.use("/api/todos/", todoRoute)

const __dirname = path.resolve();

connectDB()
.then(()=>{
    console.log("Database is Connected")
    app.listen(PORT, ()=>{
        console.log("Server is Started")
    })

})
.catch((err)=>{
    console.log("Database Connection is Failed", err)
})
