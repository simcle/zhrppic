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
    const diff = parseFloat(req.body.qty) - parseFloat(req.body.onHand)
    const payload = {
        userId: req.user.userId,
        productId: req.body._id,
        stock: parseFloat(req.body.onHand),
        counted: parseFloat(req.body.qty),
        difference: Math.round(diff * 100) / 100
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