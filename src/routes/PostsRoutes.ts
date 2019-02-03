import {Request,Response,Router} from 'express'
import Post from '../models/PostsModels'

class PostsRoutes{
    router : Router
    constructor(){
        this.router = Router()  
    }

    async getPost(req : Request , res: Response) : Promise<void>{
       const posts = await Post.find()
       res.json(posts)
    }

    async getPostByTitle(req : Request , res: Response) : Promise<void>{
        const posts = await Post.findOne({title : req.params.id})
        res.json(posts)
    }

   async createPost(req : Request , res : Response) : Promise<void>{
      const {title , url , content, image, createdAt,updateAt} = req.body
      const newPosts = new Post({title , url , content, image, createdAt,updateAt})
      await newPosts.save()
      res.json({data : newPosts})
    }

     async updatePostById(req : Request , res : Response):Promise<void>{
        const {id} = req.params
        const post = await Post.findOneAndUpdate({id},req.body,{new: true})
        res.json(post)
    }    

   async deletePostById(req : Request , res : Response): Promise<void>{
        const {id} = req.params
         await Post.findOneAndDelete({id})
        res.json({Response : "post dlected succesfully "})
    }

    routes(){
        this.router.get('/api/posts',this.getPost)
        this.router.get('/api/posts/:_id',this.getPostByTitle)
        this.router.post('/api/posts',this.createPost)
        this.router.put('/api/posts/:_id',this.updatePostById)
        this.router.delete('/api/posts/:_id',this.deletePostById)
    }
}

const postsRoutes = new PostsRoutes()
postsRoutes.routes()
export default postsRoutes.router; 