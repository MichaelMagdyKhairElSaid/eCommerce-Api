import {Schema,model,Types} from "mongoose";

export const orderSchema =new Schema({
user:{
    type:Types.ObjectId,
    ref:"User"
},
cartItems:[
    {
        product:{
            type:Types.ObjectId,
            ref:"Product"
        },
        quantity:{
            type:Number,
            default:1
        },
        price:Number
    }
],
totalOrderPrice:Number,
discount:Number,
totalOrderAfterDiscount:Number,
paymentMethod:{
    type:String,
    enum:["cache","credit"],
    default:"cache"
},
shippingAddress:{
    city:String,
    street:String
},
isPaid:Boolean,
paidAt:Date,
isDeleverd:Boolean
},{
    timestamps:true
}) 

const orderModel = model("Order",orderSchema)

export default orderModel