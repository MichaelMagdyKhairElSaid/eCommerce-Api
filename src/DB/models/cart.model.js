import {Schema,model,Types} from "mongoose";

export const cartSchema =new Schema({
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
totalPrice:Number,
discount:Number,
totalPriceAfterDiscount:Number
},{
    timestamps:true
})
cartSchema.pre("init",(doc)=>{
doc.logo = process.env.BASE_URL + "cart/" + doc.logo
})
const cartModel = model("Cart",cartSchema)

export default cartModel