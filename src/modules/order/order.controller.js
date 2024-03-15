
import AppError from "../../utils/services/AppError.js"
import { asyncHandler } from "../../utils/middleware/catchAsyncError.js"
import cartModel from "../../../DB/models/cart.model.js"
import orderModel from "../../../DB/models/order.model.js"
import productModel from "../../../DB/models/product.model.js"
import Stripe from "stripe"
const stripe = new Stripe("sk_test_51NxYxDBDiC1sCrFhanPEhgh0DJzjDv7XknxyBHwefTjqQNoY6fDT5xi4BwWKjyJfRzR06UqWHQygQkGQc8mmk7ht0051HcVSlI") 

export const createOrder =  asyncHandler(async(req,res,next)=>{
    //1-get cart id from pramas
    let cart = await cartModel.findById(req.params.id)
    !cart && next(new AppError(`you have no item in cart`,400))
    //2-calc totalprice 
    let totalOrderPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice
    //3-create order
    //REVIEW:attatch last order to user 
    let order = new orderModel({
        user:req.user._id,
        cartItems:cart.cartItems,
        totalOrderPrice,
        shippingAddress:req.body.shippingAddress
    })
    //4-update sold and quantity
    if (order) {
        //NOTE:we user bulk write as it await editing items while looping 
        let options = cart.cartItems.map((item)=>({ // between () as it is an obj
            updateOne:{
filter:{_id:item.product},
update:{$inc:{quantity:-item.quantity,sold:item.quantity}},
 },
        }))
        await productModel.bulkWrite(options)
        await order.save()
    }else{
        return next(new AppError("error creating order",409))
    }
    //5-remove cart 
    await cartModel.findByIdAndDelete(req.params.id)
    res.json({message:"Done",order}) 
})

export const getOrder = asyncHandler(async(req,res,next)=>{
    let order = await orderModel.findOne({user:req.user._id}).populate("cartItems.product")
    res.json({message:"Done",order})
})
export const getAllOrders = asyncHandler(async(req,res,next)=>{
    let order = await orderModel.find()
    res.json({message:"Done",order})
})

export const onlinePayment =asyncHandler(async(req,res,next)=>{
    let cart = await cartModel.findById(req.params.id)
    !cart && next(new AppError(`you have no item in cart`,400))
    //2-calc totalprice 
    let totalOrderPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice
    let session = await stripe.checkout.sessions.create({
        line_items:[
            {
                price_data:{
                    currency:"egp",
                    unit_amount:totalOrderPrice*100,
                    product_data:{
                        name:req.user.name
                    }
                },
                quantity:1
            }
        ],
        mode: 'payment',
        success_url: `https://www.google.com/`,
        cancel_url: `https://www.bing.com/`,
        customer_email:req.user.email,
        client_reference_id:req.params.id,
        metadata:req.body.shippingAddress

    })





    res.json({message:"helloz",session})
})

export const createOn1ineOrder=asyncHandler(async(req,res,next)=>{
// check cash transaction is done or not 
const sig = req.headers['stripe-signature'].toString()
let event;
try {
    event= stripe.webhooks.constructEvent(req.body,sig,"secret key")
} catch (err) {
return next(new AppError(`webhook error`,400))
}
// Handle the event
if (event.type="checkout.session.completed"){
    const checkoutSessionCompleted =event.data.object;
console.log(`create order here ......`);
}else {
console.log(`unhandled event type ${event.type}`);
}
})