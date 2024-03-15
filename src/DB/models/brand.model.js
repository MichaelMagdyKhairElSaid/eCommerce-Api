import {Schema,model,Types} from "mongoose";

export const brandSchema =new Schema({
name:{
    type:String,
    unique:[true,"name is unique"],
    trim:true,
    require:[true,"name is required"],
    minLenght:[2,"name is too short"],
},
slug:{
    type:String,
    lowercase:true,
    require:[true,"slug is required"],
},
logo:String,
category:{
    type:Types.ObjectId,
    require:true,
    ref:"Category"
},
subCategory:{
    type:Types.ObjectId,
    require:true,
    ref:"SubCategory"
}
},{
    timestamps:true
})
brandSchema.pre("init",(doc)=>{
doc.logo = process.env.BASE_URL + "brand/" + doc.logo
})
const brandModel = model("Brand",brandSchema)

export default brandModel