import validate from "../utils/validate.js";
import unitSchema from "../validations/unitValidation.js";
import UnitModel from '../models/unit.js'
import ErrorResponse from "../utils/errorHandler.js";

export const insertUnit = async (payload) => {
    const unit = await validate(unitSchema, payload)
    try {
        const data = await UnitModel.create(unit)
        return data
    } catch (error) {
        throw new ErrorResponse(400, error)
    }
}

export const readUnits = async () => {
    try {
        const data = await UnitModel.find().sort({name: 1})
        return data
    } catch (error) {
        throw new ErrorResponse(400, error)
    }
}

export const updateUnit = async (payload) => {
    const { _id, name } = payload
    try {
        const data = await UnitModel.updateOne({_id: _id}, {name: name})
        return data
    } catch (error) {
        throw new ErrorResponse(400, error)
    }
}