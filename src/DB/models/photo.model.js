import {Schema,model,Types} from "mongoose";

export const photoSchema =new Schema({
path:String,
createdBy:{
type:Types.ObjectId,
ref:"User"
},
totalVote:{
    type:Number,
    default:0
}
},{
    timestamps:true
})

const photoModel = model("photo",photoSchema)

export default photoModel