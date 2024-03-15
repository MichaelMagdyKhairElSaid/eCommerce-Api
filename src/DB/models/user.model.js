import  {Schema,model,Types} from "mongoose";
//FIXME:why ERROR from database not working
import bcrypt from "bcrypt"

export const userSchema =new Schema({
name:{
    type:String,
    trim:true,
    require:[true,"name is required"],
    minLenght:[2,"name is too short"]
},
email:{
    type:String,
    trim:true,
    require:[true,"email is required"],
    minLenght:1,
    unique:[true,"email must be unique"],
    
},
password:{
    type:String,
    require:[true,"password is required"],
    minLenght:6
},
phone:{
    type:String,
    require:[true,"phone is required"],
},
wishList:[{
    type:Types.ObjectId,
    ref:"Product"
}],
addressList:[{
    type:String,
}]
,
profilePic:String,
role:{
    type:String,
    default:"User",
    enum:["User","Admin"]
},
isActive:{
    type:Boolean,
    default:false,
},
verified:{
    type:Boolean,
    default:false,
},
age:{
    type:Number,
    require:[true,"age is required"],
    min:18
},
blocked:{
    type:Boolean,
    default:false,
},
changePassAt:Date
},{
    timestamps:true
})


userSchema.pre("save",function () { //return document that is object
    // console.log(this); //document
    
    this.password = bcrypt.hashSync(this.password,Number(process.env.SALT_ROUNDS))
})

userSchema.pre("findOneAndUpdate",function () { //return all query rleatd and not rleated to my document
    console.log("this =============="+ this); //query
    console.log("Number(process.env.SALT_ROUNDS) ="+Number(process.env.SALT_ROUNDS));
    
    this._update.password = bcrypt.hashSync(this._update.password,Number(process.env.SALT_ROUNDS))
})


const userModel = model("User",userSchema)

export default userModel 