import session from "express-session"
import connectMongo from 'connect-mongo'
import { MONGODB_CNX_STR, SESSION_SECRET } from "../config.js"

const store = connectMongo.create({
    mongoUrl:MONGODB_CNX_STR,
    ttl:60*60*24
})

export const sessions =session({
    store,
    secret:SESSION_SECRET,
    resave:false,
    saveUninitialized:false
})
/* import cookieParser from 'cookie-parser'
import { randomUUID } from 'node:crypto'

const sessions={}

function  session (req,res,next){
    let IDsession
    if( req.signedCookies.sid && sessions[ req.signedCookies.sid]){
         IDsession =  req.signedCookies.sid 
    }else{
        IDsession=  randomUUID()
        sessions[IDsession] = {}
        res.cookie('sid',IDsession,{signed:true})
        // IDsession =req.signedCookies.sid
         
    }

    req['sesion'] = sessions[req.signedCookies.sid]
    next()
}


export default (secretWord)=>{
    return (req,res,next) =>{
        cookieParser(secretWord)(req,res,()=>{
            session(req,res,next)
        })
    }
} */