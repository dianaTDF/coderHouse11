import passport from "passport"
import { Strategy as localStrategy } from "passport-local"
import { userDao } from "../daos/dao/index.js"

passport.serializeUser((user,next)=>{next(null,user)})

passport.deserializeUser((user,next)=>{next(null,user)})


/* ------------------------ estrategia local passport ----------------------- */
const passportConf={
    usernameField:'email',
    passwordField:'pass'
}

async function verificationCallBack(username,password,done){
    try {
        const userData = await userDao.login(username,password)
        done(null,userData)
    } catch (error) {
        done(error)
    }
}

const loginLocal = new localStrategy(passportConf,verificationCallBack)

passport.use('loginLocal',loginLocal)
/* ---------------------- fin estrategia local passport --------------------- */

export const passportInitialize= passport.initialize()
export const passportSession = passport.session() 


