import { Router } from "express"
import { userDao } from "../../daos/dao/index.js"

export const router= Router()


router.post('/',async(req,res)=>{
    const user= await userDao.findOne(req.body)
    if(user){
        let rol
        if(user.email== 'adminCoder@coder.com' && user.pass == 'adminCod3r123'){
            rol = 'admin'
        }else{
            rol = 'user'
        }

 
        req.session['user']={
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            rol: rol,
        }
        res.status(201)
        .json({
            status:'success',
            message:req.session['user'],
        })
    }else{
        return res.status(401).json({
            status:'error',
            message:'login failed',
        })
    }
})

router.delete('/current',async(req,res)=>{
    req.session.destroy(err =>{
        res.status(204).json({status:'success'})
    })
})