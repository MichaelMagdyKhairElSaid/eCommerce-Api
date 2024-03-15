import mongoose from "mongoose";

let couponSchema = mongoose.Schema({
    code:{
        type:String,
        trim:true,
        unique:true,
        required:[true,"code required"]
    },
    discount:{
        type:Number,
        min:0,
        required:[true,"coupon discount required"]
    },
    expires:{
        type:String,
        required:[true,"coupon expire required"]
    }

},{
    timestamps: true})

 const couponModel = mongoose.model("Coupon",couponSchema)

 export default couponModel