import {Schema,model,Types} from "mongoose";

export const subCategorySchema =new Schema({
name:{
    type:String,
    require:[true,"name is required"],
    minLenght:[2,"name is too short"],
    unique:[true,"name is unique"]
},
slug:{
    type:String,
    require:[true,"slug is required"],
    lowercase:true,
},
category:{
    type:Types.ObjectId,
    require:true,
    ref:"Category"
},
customId:String
},{
    timestamps:true
})
const subCategoryModel = model("SubCategory",subCategorySchema)

export default subCategoryModel