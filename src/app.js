import express  from "express"
import handlebars from 'express-handlebars'
import {Server} from 'socket.io'
import {PORT} from './config.js'
import {router as apiRouter} from './routers/api.router.js'
import {router as webRouter} from './routers/web.router.js'
import {router as userRouter} from './routers/user/user.router.js'
import {router as sesionRouter} from './routers/user/session.router.js'
import { onConnection } from "./sockets/socket.controller.js"
import { sessions } from "./middleware/sessions.js"
import { passportInitialize, passportSession } from "./middleware/authentication.js"
//import cookieParser from "cookie-parser"
//import sessionsMiddleware from "./middleware/sessions.js"

const app = express()
app.engine('handlebars',handlebars.engine())

const server = app.listen(PORT, ()=>{
    console.log(`conected to port ${PORT}`)
})


const socketServer= new Server(server)
socketServer.on('connection', onConnection(socketServer))


//app.use(cookieParser())

//app.use(cookieParser('DirtySecret'))
app.use(sessions )
app.use(passportInitialize,passportSession )
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/statics', express.static('./statics'))
app.use('/api',apiRouter)
app.use('/',webRouter)
app.use('/users',userRouter)
app.use('/sessions',sesionRouter)