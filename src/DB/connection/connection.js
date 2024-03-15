import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config({})
export const dbConnection =()=>{ mongoose.connect(process.env.CONNECTION_DATA_BASE).then(()=>{
    console.log("connected to mongoDB");
}).catch((err)=>{  
console.log("cant connect to DB");
})}
