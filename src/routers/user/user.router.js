import { Router } from "express";
import { userDao } from "../../daos/dao/index.js";

export const router = Router()

router.post('/',async (req,res)=> {

/*     const {name
    ,lastname
    ,age
    ,email
    ,pass}= req.body */
    try {
        const user = await userDao.create(req.body)
        const response= {
            email:user.email,
            name:user.name,
            lastname:user.lastname,
        }
        res.status(201).json({status:'success',playload:response})         
    } catch (error) {
        res.status(400).json({status:'failure',playload:{message:error.message}})         
        
    }

})