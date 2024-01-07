import Router from 'express'
/* import {router as messageRouter} from './message.router.js'
import {router as cartRouter} from './cart.router.js'
import {router as productRouter} from './product.router.js' */
import { cartDao, productDao } from '../daos/dao/index.js'
import { privateRoute } from '../middleware/authorization.js'
import passport from 'passport'

export const router = Router()

router.get('/chat',privateRoute,(req,res)=>{
    res.render('chat.handlebars',{title:'Chat',css:true, cssRoute:`/statics/css/chat.css`,
    ...req.user,
    loggedUser: req.user?req.user.name:false})
})


router.get('/carts/:cid', async (req,res)=>{
    const  {cid}= req.params
    try {
        const cart = await cartDao.findById(cid).lean()
        console.log(cart)
        res.render('carts.show.handlebars',{title:'Ver carrito',cart:cart})
    } catch (error) {
        res.status(404).send({result:'error'})
        console.log(`MongoDB: couldn't get cart\n ERROR: ${error}`)
    }
    
})


router.get('/products/:pid', async (req,res)=>{
    const  {pid}= req.params
    try {
        const product = await productDao.findById(pid).lean()
        res.render('products.show.handlebars',{title:'Ver roducto',product:product,
        loggedUser: req.user?req.user.name:false})
    } catch (error) {
        res.status(404).send({result:'error'})
        console.log(`MongoDB: couldn't get product\n ERROR: ${error}`)
    }
    
})


router.get('/products', async (req,res)=>{

    const  {limit=10, page=1, sort, query} = req.query 

    let seachOptions={
        limit:limit==''?10:limit,
        page:page==''?1:page,
        lean: true //estuve luchando 2 horas y solo me faltaba esta opcion :,D
    }
 console.log(limit)
    if (sort){
        if (sort== 'desc'){            
            seachOptions.sort = {price: -1}
        }
        if (sort== 'asc'){
            seachOptions.sort = {price: 1}
        }        
    }

    const title = query?{ title: { $regex: new RegExp(query, 'i') } }:{}


    const result = await productDao.paginate(title, seachOptions)
    
    if(query){
        result.hasTitle=true
        result.title=query
    }
    if(sort){
        result.hasSort=true
        result.sort=sort
    }
    res.render('products.new.handlebars',{title:'productos', ...result,
    loggedUser: req.user?req.user.name:false})
})

/* 
router.get('/',(req,res)=>{
    res.render('products.old.handlebars',{title:'Productos'})
})
*/


router.get('/',(req,res)=>{
    if(req.user){
        res.redirect('/profile',{title:'Login',
        loggedUser: req.user?req.user.name:false})    
    }
    res.redirect('/login')    

})

router.get('/register',(req,res)=>{
    res.render('users/register.handlebars',{title:'Registro',
    loggedUser: req.user?req.user.name:false})
})

router.get('/login',(req,res)=>{
    res.render('users/login.handlebars',
    {title:'Login',
    loggedUser: req.user?req.user.name:false})
})

router.get('/githublogin', passport.authenticate('loginGithub'))

router.get('/githubcallback', passport.authenticate('loginGithub',{
    successRedirect:'/profile',
    failureRedirect:'/login',
}))


router.get('/profile',privateRoute,(req,res)=>{

    res.render('users/profile.handlebars',
        {title:'Perfil',
        ...req.user,
        loggedUser: req.user?req.user.name:false})
})







/* router.use('/cart',cartRouter)
router.use('/product',productRouter) */

