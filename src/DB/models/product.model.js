import {Schema,model,Types} from "mongoose";

export const productSchema =new Schema({
name:{
    type:String,
    require:[true,"name is required"],
    lowercase:true,
    minLenght:[2,"name is too short"],
    unique:[true,"name is unique"]
},
slug:{
    type:String,
    require:[true,"slug is required"],
}, 
description:{
    type:String,
    minLenght:[2,"description is too short"],
    maxLenght:[300,`too long product description`],
    require:[true,"description is required"],
    trim:true,

},
color:[String],
size:[String],
price:{
    type:Number,
    require:[true,"price is required"],
},
priceAfterDiscount:{
    type:Number,
    require:[true,"discount is required"],
    default:0
},
ratingAvg:{
type:Number,
min:[1,`rating must be more than 1`],
max:[5,`rating must be less than 5`]
},
ratingCount:{
    type:Number,
    default:0,
    min:0
},
finalPrice:Number,
quantity:{
    type:Number,
    default:0,
    min:0,
    require:[true,`product quantity required`]
},
stock:{
    type:Number,
    default:0
},
sold:{
    type:Number,
    default:0,
    min:0
},
imageCover:String,
images:[String],
category:{
    type:Types.ObjectId,
    require:true,
    ref:"Category"
},
subCategory:{
    type:Types.ObjectId,
    require:true,
    ref:"SubCategory"
},
brand:{
    type:Types.ObjectId,
    require:true,
    ref:"Brand"
},

createdBy:{
    type:Types.ObjectId,
    require:true,
    ref:"User"
},
updatedBy:{
    type:Types.ObjectId,
    ref:"User"
},
deletedBy:{
    type:Types.ObjectId,
    ref:"User" 
},
},{
    timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}
})
// productSchema.pre("init",(doc)=>{
//     doc.imageCover = process.env.BASE_URL+"product/"+ doc.imageCover
//     if(doc.images)doc.images = doc.images.map((path)=>process.env.BASE_URL+"product/"+ path) 
// })

/* 
productSchema.virtual("productReviews",{ //NOTE : child parent relation
ref:"Review",
localField:"_id",
foreignField:"product",
})
productSchema.pre(/^find/,function () {
    this.populate("productReviews")
})
  */
const productModel = model("Product",productSchema)

export default productModel