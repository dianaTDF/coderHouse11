import { Router } from "express"
import { userDao } from "../../daos/dao/index.js"
import passport from "passport"
//import { sameHashedPass } from "../../utils./criptography.js"

export const router= Router()

/* 
async function login(email,password){

    const user= await userDao.findOne(email).lean()
    
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

 */


router.post('/',
    passport.authenticate('loginLocal')
    ,
    async (req,res,next)=>{
        res.status(201)
        .json({
            status:'success',
            message:"login success",
        })
    },
    (error, req,res,next)=>{
       //console.log('aqui estoy 3')

        res.status(401)
        .json({
            status:'error',
            //message:error.message,
            message:error.message,
        })
    }
    )


    router.delete('/current',async(req,res)=>{
        req.session.destroy(err =>{
            res.status(204).json({status:'success'})
        })
    })


/* 
version 1 de ruta /

router.post('/',async(req,res)=>{
    
    try {
        const {email, password}=req.body

        const userData= await userDao.login(email,password)
        
        req.session['user']=userData
        res.status(201)
        .json({
            status:'succ
            ess',
            message:req.session['user'],
        })
    
    } catch (error) {
        res.status(401)
        .json({
            status:'error',
            message:error.message,
        })
    }

})

*/

/* 
version 2 de ruta /


router.post('/',
    async(req,res,next)=>{
        const {email, pass}=req.body
        console.log(pass)
        try {
            const userData= await userDao.login(email,pass)
           // console.log(userData)

            //req.session['user']=userData
            req.login(userData,(error=>{
                if(error){
                   // console.log('aqui estoy')
                    next(error)
                }else{
                    next()
                }
            }))
            //next()
            
        } catch (error) {
//            console.log('aqui estoy 2')

            next(error)
        }        
    },
    async (req,res,next)=>{
        res.status(201)
        .json({
            status:'success',
            message:"login success",
        })
    },
    (error, req,res,next)=>{
       //console.log('aqui estoy 3')

        res.status(401)
        .json({
            status:'error',
            //message:error.message,
            message:error.message,
        })
    }
    )  
*/

