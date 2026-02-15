import express from 'express'
import { userCreate, userLogin, userMe } from '../controllers/userController.js'
import authenticate from '../middleware/authMiddleware.js'

const userRouter = express.Router()

userRouter.post('/register', userCreate)
userRouter.post('/login', userLogin)
userRouter.get('/me', authenticate, userMe)
export default userRouter