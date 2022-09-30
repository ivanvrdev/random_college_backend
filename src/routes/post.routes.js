import { Router } from "express"
import { createPost, getPost, updatePost, deletePost} from '../controllers/post.controllers.js'

const postRoutes = Router()

postRoutes.post('/create', createPost)
postRoutes.get('/list', getPost)
postRoutes.put('/update', updatePost)
postRoutes.delete('/delete', deletePost)

export default postRoutes