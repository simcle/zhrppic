import validate from "../utils/validate.js";
import userSchema from "../validations/userValidation.js";
import UserModel from '../models/user.js'
import ErrorResponse from "../utils/errorHandler.js";
import mongoose from "mongoose";

export const insertUser = async (payload) => {
    const user = await validate(userSchema, payload)
    try {
        const data = await UserModel.create(user)
        return data
    } catch (error) {
        throw new ErrorResponse(400, error)
    }
} 

export const loginUser = async (payload) => {
    const { email, password} = payload
    try {
        const user = await UserModel.findOne({email})
        if(!user) {
            throw new ErrorResponse(401, 'Pengguna tidak ditemukan')
        }
        const isMatch = await user.comparePassword(password)
        if(!isMatch) {
            throw new ErrorResponse(401, 'Email atau password anda salah')
        }
        return user
    } catch (error) {
        throw new ErrorResponse(400, error)
    }
}

export const getMe = async (payload) => {
    const { userId } = payload
    try {
        const data = await UserModel.findById(userId)
        return data
    } catch (error) {
        throw new ErrorResponse(400, error)
    }
}