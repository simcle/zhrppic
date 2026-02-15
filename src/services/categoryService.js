import validate from '../utils/validate.js'
import categorySchema from '../validations/categoryValidation.js'
import CategoryModel from '../models/category.js'
import ErrorResponse from '../utils/errorHandler.js'

export const insertCategory = async (payload) => {
    const category = await validate(categorySchema, payload)
    try {
        const data = await CategoryModel.create(category)
        return data
    } catch (error) {
        throw new ErrorResponse(400, error)
    }
}

export const readCategories = async () => {
    try {
        const data = await CategoryModel.find().sort({name: 1})
        return data
    } catch (error) {
        throw new ErrorResponse(400, error)
    }
}

export const updateCategory = async (payload) => {
    const { _id, name} = payload
    try {
        const data = await CategoryModel.updateOne({_id: _id}, {name: name})
        return data
    } catch (error) {
        throw new ErrorResponse(400, error)
    }
}