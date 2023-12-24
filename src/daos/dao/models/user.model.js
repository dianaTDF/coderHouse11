import {mongoose,model} from "mongoose"
import {randomUUID} from 'node:crypto'

const userCollection = "users"

const userSchema = new mongoose.Schema({
    _id:{type:String, default:randomUUID},
    name:{type:String,required:true},
    lastname:{type:String,required:true},
    age:{type:Number,required:true},
    email:{type:String,unique:true,required:true},
    pass:{type:String,required:true}
},{
    strict: 'throw',
    versionKey: false
})

export const manager = model(userCollection,userSchema)