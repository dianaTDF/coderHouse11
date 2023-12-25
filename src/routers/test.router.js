/* 
import Router from 'express'

export const router = Router()

router.get('/setCookie',(req,res)=>{
    res.cookie('myCookie','alta cookie',{maxAge:10000}).send("Cookie")
})
router.get('/getCookie',(req,res)=>{
        res.send(req.cookies)

//    res.send(req.cookies)
})
router.get('/delCookie',(req,res)=>{
    res.clearCookie('myCookie').send("Cookie eliminada!")
})

router.get('/setSignedCookie',(req,res)=>{
    res.cookie('mySignedCookie','alta cookie, y con security',{maxAge:10000,signed:true}).send("Cookie")
})
router.get('/getSignedCookie',(req,res)=>{
    res.send(req.signedCookies)
})


router.get('/testForm',(req,res)=>{
    res.render('cookieTest.handlebars',{title:'cookie'})
})

router.post('/cookieGet',(req,res)=>{
    const data = req.body
    console.log('POST:'+JSON.stringify(data))
    res.cookie('cookieFromForm',data,{maxAge:10_000})
    
    res.status(201).json({status:'success',message:'cookie set'})
})
 */


//sin express-session
/* router.get('/',(req,res)=>{
    if(!req['sesion']['counter']){
        req['sesion']['counter'] =1
        res.send('Bienvenido')
    }else{
      req['sesion']['counter']++
        res.send(`has visitado la pagina ${req['sesion']['counter']} veces`)
    }
})
 */
//con express-session
/* router.get('/',(req,res)=>{
    if(req.session.counter){
        req.session.counter++
        res.send(`visitaste ${req.session.counter} el sitio`)
    }else{
        req.session.counter=1
        res.send(`Buenas`)


    }
})
 */



/* router.get('/',(req,res)=>{
    if(!req.signedCookies.sid){
        const IDsession= randomUUID()
        sessions[IDsession]={
            counter:1
        }
        
        res.cookie('sid',IDsession,{signed:true})

        res.send('Bienvenido')
    }else{
        const mySession= sessions[req.signedCookies.sid]
        mySession['counter']++
        res.send(`has visitado la pagina ${mySession['counter']} veces`)
    }
})

 */



/* router.get('/',(req,res)=>{
    if(!req.signedCookies.sid){
        const IDsession= randomUUID()
        sessions[IDsession]={
            counter:1
        }
        
        res.cookie('sid',IDsession,{signed:true})

        res.send('Bienvenido')
    }else{
        const mySession= sessions[req.signedCookies.sid]
        mySession['counter']++
        res.send(`has visitado la pagina ${mySession['counter']} veces`)
    }
})

 */