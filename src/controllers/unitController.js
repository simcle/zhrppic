import { insertUnit, readUnits, updateUnit } from "../services/unitService.js";

export const unitCreate = async (req, res, next) => {
    const payload = req.body
    try {
        const data = await insertUnit(payload)
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

export const unitGetAll = async (req, res, next) => {
    try {
        const data = await readUnits()
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

export const unitUpdate = async (req, res, next) => {
    const payload = req.body
    try {
        const data = await updateUnit(payload)
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}