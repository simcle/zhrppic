import { insertCategory, readCategories, updateCategory } from "../services/categoryService.js";

export const categoryCreate = async (req, res, next) => {
    const payload = req.body
    try {
        const data = await insertCategory(payload)
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

export const categoryGetAll = async (req, res, next) => {
    try {
       const data =  await readCategories()
       res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

export const categoryUpdate = async (req, res, next) => {
    const payload = req.body
    try {
        const data = await updateCategory(payload)
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}
