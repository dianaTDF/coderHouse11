import { Router } from "express";
import { userDao } from "../../daos/dao/index.js";
import { hashPass } from "../../utils/criptography.js";

export const router = Router()

router.post('/',async (req,res)=> {

/*     
    const {name
        ,lastname
        ,age
        ,email
        ,pass}= req.body */

    req.body.pass = hashPass(req.body.pass)
    
    try {
        const user = await userDao.create(req.body)
        const response= {
            email:user.email,
            name:user.name,
            lastname:user.lastname,
        }
  
        req.login(user.toObject(),error=>{
            if(error){
                res.status(400).json({status:'failure',playload:{message:error.message}})         
            }else{
                res.status(201).json({status:'success',playload:response})                         
            }
        })
    } catch (error) {
        res.status(400).json({status:'failure',playload:{message:error.message}})                 
    }

})