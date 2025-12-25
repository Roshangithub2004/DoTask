import express from "express";
import dotenv from "dotenv"
import {connectDB} from "./config/db.js"
import todoRoute from "./routes/todo.route.js";
import path from "path"
const PORT = process.env.PORT || 3000

dotenv.config()

const app = express()

app.use(express.json())
    

app.use("/api/todos/", todoRoute)

const __dirname = path.resolve();

if (process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname, ".frontend/dist")))
    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.htma"))
    })
}


connectDB()
.then(()=>{
    console.log("Database is Connected")
    app.listen(3000, ()=>{
        console.log("Server is Started")
    })

})
.catch((err)=>{
    console.log("Database Connection is Failed")
})
