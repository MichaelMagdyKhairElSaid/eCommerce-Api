import {Schema,model,Types} from "mongoose";

export const categorySchema =new Schema({
name:{
    type:String,
    unique:[true,"name is unique"],
    trim:true,
    require:[true,"name is required"],
    minLenght:[2,"name is too short"],
    lowercase:true,
},
slug:{
    type:String,
    require:[true,"slug is required"],
},
createdBy:{
    type:Types.ObjectId,
    ref:"User"
},
updatedBy:{
    type:Types.ObjectId,
    ref:"User"
},
image:{
    type:Object,
   
},
images:[{
    type:Object,
  
}],
customId:String,
},{
    timestamps:true
})
//mongoose hooks or mongoose middleWare
categorySchema.pre('init',(doc)=>{
    console.log(doc,"from doc");
    doc.image =process.env.BASE_URL +"category/"+doc.image;
})

const categoryModel = model("Category",categorySchema)

export default categoryModel