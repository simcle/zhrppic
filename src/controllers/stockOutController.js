import { searchInventorySKU } from "../services/inventoryService.js";
import { confirmStockOut, getStockOutDraft, insertStockOutDraft, updateStockOutDraft } from "../services/stockOutService.js";

export const inventorySearchBySku = async (req, res, next) => {
    const payload = req.query.sku 
    try {
        const data = await searchInventorySKU(payload)
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

export const stockoutGetDraft = async (req, res, next) => {
    const payload = req.user.userId
    try {
        const data = await getStockOutDraft(payload)
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

export const stockoutInsertDraft = async (req, res, next) => {
    const payload = {
        userId: req.user.userId,
        productId: req.body._id,
        qty: req.body.qty
    }

    try {
        const data = await insertStockOutDraft(payload)
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

export const stockoutUpdateDraft = async (req, res, next) => {
    const payload = req.body

    try {
        const data = await updateStockOutDraft(payload)
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

export const stockoutConfirm = async (req, res, next) => {
    const payload = {
        userId: req.user.userId,
        _id: req.params.id
    }

    try {
        const data = await confirmStockOut(payload)
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}