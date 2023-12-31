import {mongoose,model} from "mongoose"
import {randomUUID} from 'node:crypto'
import { sameHashedPass } from "../../../utils/criptography.js"

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
    versionKey: false,
    statics:{
        login: async function(email,password){

            const user= await mongoose.model(userCollection).findOne({email}).lean()
            
            if(!user){
                throw new Error('login failed')
            }
        
            if(!sameHashedPass(password,user.pass)){
                throw new Error('login failed: wrong password')
            }
        
            let rol= user.email== 'adminCoder@coder.com' && user.pass == 'adminCod3r123' ? 'admin': 'user'
        
            userData={
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                rol: rol,
            }
        
            return userData
        }

    }
})

export const manager = model(userCollection,userSchema)