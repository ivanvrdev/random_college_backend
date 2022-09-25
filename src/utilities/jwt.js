import jwt from "jsonwebtoken"
import { config } from "dotenv"

config()

const secret = process.env.JWT_SECRET

export const generateJWT = (payload) => {
    return jwt.sign(payload, secret)
}

export const validateJWT = (token) => {
    return jwt.verify(token, secret)
}