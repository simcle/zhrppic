import jwt from 'jsonwebtoken'
import config from '../config/index.js'

const JWT_SECRET = config.jwtSecret
const JWT_EXPIRES_IN = '1d'

export const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})
}

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET)
    } catch (error) {
        throw new Error(error)
    }
}