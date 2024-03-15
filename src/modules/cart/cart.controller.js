import cartModel from "../../../DB/models/cart.model.js"
import AppError from "../../utils/services/AppError.js"
import { asyncHandler } from "../../utils/middleware/catchAsyncError.js"
import productModel from "../../../DB/models/product.model.js"
import couponModel from "../../../DB/models/coupon.model.js"

function calcPrice(cart) {
    let totalPrice = 0
    console.log("cart.cartItems"+cart.cartItems);
    cart.cartItems.forEach((ele)=>{
        totalPrice += ele.quantity * ele.price
    })
    cart.totalPrice = totalPrice
}

export const createCart = asyncHandler(async(req,res,next)=>{

let product = await productModel.findById(req.body.product).select("price")
!product && next(new AppError("product not found",404))
req.body.price = product.price

    let isCartExist = await cartModel.findOne({user:req.user._id})
    if (!isCartExist) {
        let cart = new cartModel({
            user:req.user._id,
            cartItems:[req.body],
        })
        calcPrice(cart)
        await cart.save()
        return res.status(201).json({message:"success",cart})
    }
    //add item if cart is already created
    let item = isCartExist.cartItems.find((ele)=> ele.product == req.body.product)
     if (item) {
         item.quantity +=1
     }else{
        isCartExist.cartItems.push(req.body)
     }

    calcPrice(isCartExist)
 if(isCartExist.discount) isCartExist.totalPriceAfterDiscount =isCartExist.totalPrice -(isCartExist.totalPrice*isCartExist.discount)/100;
     await isCartExist.save()
    res.json({message:"item added to cart successfuly",isCartExist})
})

export const getCart=asyncHandler(async(req,res,next)=>{
    let cart = await cartModel.findOne({user:req.user._id})
    !cart && next(new AppError("no cart found",404))
    cart && res.json({message:"success" ,cart})
})

export const removeCartItem=asyncHandler(async(req,res,next)=>{
  
    let cart = await cartModel.findOneAndUpdate({user:req.user._id},{$pull:{cartItems:{_id:req.params.id}}},{new:true})
    calcPrice(cart)
    if(cart.discount) cart.totalPriceAfterDiscount =cart.totalPrice-(cart.totalPrice*cart.discount)/100;
    await cart.save()
    !cart && next(new AppError("no cart item with this id",404))
    cart && res.json({message:"success" ,cart})
})

export const updateCart = asyncHandler(async(req,res,next)=>{

    let product = await productModel.findById(req.body.product).select("price")
    !product && next(new AppError("product not found",404))
    req.body.price = product.price
    
        let isCartExist = await cartModel.findOne({user:req.user._id})
        //add item if cart is already created
        let item = isCartExist.cartItems.find((ele)=> ele.product == req.body.product)
        !item && next(new AppError("item not exist ",404))
         if (item) {
             item.quantity=req.body.quantity
         }
    
        calcPrice(isCartExist)
    
         await isCartExist.save()
        res.json({message:"item added to cart successfuly",isCartExist})
    })

export const applyCoupon =asyncHandler(async(req,res,next)=>{
    //1-get coupon from params
    let code =await couponModel.findOne({code:req.params.code})
    //2-get coupon dicount
    let cart = await cartModel.findOne({user:req.user._id})
    cart.totalPriceAfterDiscount = cart.totalPrice -(cart.totalPrice *code.discount)/100;
    console.log("discount"+code.discount);
    //3-calc discount
    cart.discount = code.discount
    await cart.save()
    res.json({message:"done",cart})
})

