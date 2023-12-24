import {mongoose,model} from "mongoose"
import {randomUUID} from 'node:crypto'
import mongoosePaginate from 'mongoose-paginate-v2'

const productCollection = "products"

const productSchema = new mongoose.Schema({
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

productSchema.plugin(mongoosePaginate)
export const manager = model(productCollection,productSchema)
