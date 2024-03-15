import express from "express";
import dotenv from "dotenv"
import { dbConnection } from "./DB/connection/connection.js";
dotenv.config({})
import {init} from "./modules/index.js"
import morgan from "morgan";
// import cros from "cros" 

const port = 3000
const app = express()
app.use(express.json()) 
app.use(express.urlencoded({extended:true})) // to parse form data

app.use(express.static("upload"))
   
app.use(morgan('dev'))
 
init(app)

dbConnection()

app.listen(process.env.PORT || port,()=>{console.log(` app listen to port ${port} ,welcome to server......`);}) 

process.on("unhandledRejection",(err)=>{
        console.log(err);
})





