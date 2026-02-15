import { searchInventorySKU } from "../services/inventoryService.js";
import { insertStockopnameDraft, getStockOpnameDraft, updateStockOpnameDraft, confirmStockOpname } from "../services/stockopname.js";

export const inventorySearchBySku = async (req, res, next) => {
    const payload = req.query.sku
    try {
        const data = await searchInventorySKU(payload)
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

export const stockopnameGetDraft = async (req, res, next) => {
    const payload = req.user.userId
    try {
        const data = await getStockOpnameDraft(payload)
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

export const stockopnameInsertDraft = async (req, res, next) => {
    const payload = {
        userId: req.user.userId,
        productId: req.body._id,
        stock: req.body.onHand,
        counted: parseInt(req.body.qty),
        difference: parseInt(req.body.qty) - parseInt(req.body.onHand)
    }

    try {
        const data = await insertStockopnameDraft(payload)
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

export const stockopnameUpdateDraft = async (req, res, next) => {
    const payload = req.body
    try {
        const data = await updateStockOpnameDraft(payload)
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

export const stockopnameConfirm = async (req, res, next) => {
    const payload = {
        userId: req.user.userId,
        _id: req.params.id 
    }
    try {
        const data = await confirmStockOpname(payload)
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}