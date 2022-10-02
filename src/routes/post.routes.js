import { Router } from "express"
import { createPost, getPosts, updatePost, deletePost, getPostById} from '../controllers/post.controllers.js'

const postRoutes = Router()

postRoutes.post('/create', createPost)
postRoutes.get('/list', getPosts)
postRoutes.get('/:id', getPostById)
postRoutes.put('/update/:id', updatePost)
postRoutes.delete('/delete/:id', deletePost)

export default postRoutes