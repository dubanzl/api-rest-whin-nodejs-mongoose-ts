import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import mongoose from 'mongoose'
import compression from 'compression'
import cors from 'cors'

// routes
import IndexRoutes from './routes/IndexRoutes'
import PostsRouter from './routes/PostsRoutes'

class Server {
    public app : express.Application

    constructor(){
        this.app = express()
        this.config()
        this.routes()
    }

    config(){
        //Settings 
        this.app.set('port',process.env.PORT|| 3000 )
        const MONGO_URI = 'mongodb://localhost/restapits'
        mongoose.set('useFindAndModify',true)
        mongoose.connect(MONGO_URI || process.env.MONGODB_URL,{
            useNewUrlParser:true,
            useCreateIndex:true,
        }).then(db => console.log("db is connect"))

        //Middlewares
        this.app.use(express.json())  
        this.app.use(express.urlencoded({extended:false}))   
        this.app.use(morgan('dev'))
        this.app.use(helmet())
        this.app.use(compression())
        this.app.use(cors())
    }

    routes(){
        this.app.use(IndexRoutes)
        this.app.use(PostsRouter)
    }

    start(){
        this.app.listen(this.app.get('port'),() => {
            console.log(' Server on port ' + this.app.get('port'))
        })
    }
}

 new Server().start()