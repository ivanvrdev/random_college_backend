import { Router } from "express"
import { logIn, logInByToken } from "../controllers/auth.controllers.js"

const authRoutes = Router()

authRoutes.post('/login', logIn)
authRoutes.post('/token', logInByToken)

export default authRoutes