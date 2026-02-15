import { insertUser, loginUser, getMe } from "../services/userService.js";
import { generateToken } from "../utils/jwtHelper.js";

export const userCreate = async (req, res, next) => {
    const payload = req.body
    try {
        const data = await insertUser(payload)
        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

export const userLogin = async (req, res, next) => {
    const payload = req.body
    try {
        const user = await loginUser(payload)
        const encode = generateToken({userId: user._id, role: user.role}) 
        const data = {
            name: user.name,
            email: user.email,
            role: user.role,
            token: encode
        }
        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

export const userMe = async (req, res, next) => {
    const payload = req.user
    try {
        const user  = await getMe(payload)
        const data = {
            name: user.name,
            email: user.email,
            role: user.role
        }
        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}