import {Schema,model,Types} from "mongoose";

export const reviewSchema =new Schema({
comment:{
type:String,
trim:true,
require:[true,"review comment required"]
},
product:{
    type:Types.ObjectId,
    ref:"Product"
},
user:{
    type:Types.ObjectId,
    ref:"User"
},
rating:{
    type:Number,
    min:1,
    max:5
}
},{
    timestamps:true
})

reviewSchema.pre(/^find/,function () {//NOTE:dont use arrow fun becase it has no this obj ref
    this.populate("user","name")
})

const reviewModel = model("Review",reviewSchema)

export default reviewModel