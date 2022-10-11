import { Router } from "express"

import { createUser, getUsers, updateUser, deleteUser, getUserById } from "../controllers/user.controllers.js"
import { authorizeAdminOnly, authorizeUpdateUser } from "../middlewares/customMiddlewares.js"
import { userValidations } from "../middlewares/user.middlewares.js"
import { upload } from "../middlewares/uploadFiles.js"

const userRoutes = Router()

userRoutes.post('/create', authorizeAdminOnly, userValidations, createUser)
userRoutes.get('/list', getUsers)
userRoutes.get('/:id', getUserById)
userRoutes.put(
    '/update/:id', 
    authorizeUpdateUser, 
    userValidations, 
    upload.single('avatar'),
    updateUser
)
userRoutes.delete('/delete/:id', authorizeAdminOnly, deleteUser)

export default userRoutes