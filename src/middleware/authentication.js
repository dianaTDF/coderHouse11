 import passport from "passport"
import { Strategy as localStrategy } from "passport-local"
import { userDao } from "../daos/dao/index.js"
import { Strategy as githubStrategy } from "passport-github2"
import { GITHUB_CALLBACK_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "../config.js"

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

passport.use('loginGithub',new githubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret:GITHUB_CLIENT_SECRET,
    callbackURL:GITHUB_CALLBACK_URL 
},async(a,b,profile,done)=>{
    console.log(profile)
    let user = await userDao.findOne({email:profile.username})
    if(!user){
        user= await userDao.create({
            name: profile.name,
            email:profile.username,
        })
    }
    done(null,user.toObject())
}))//te querdaste en 32802

export const passportInitialize= passport.initialize()
export const passportSession = passport.session() 


