import { searchInventorySKU } from "../services/inventoryService.js";
import { confirmReceipt, getReceiptDraft, insertReceiptDraft, updateReceiptDraft } from "../services/receiptService.js";

export const inventorySearchBySku = async (req, res, next) => {
    const payload = req.query.sku 
    try {
        const data = await searchInventorySKU(payload)
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

export const receiptGetDraft = async (req, res, next) => {
    const payload = req.user.userId
    try {
        const data = await getReceiptDraft(payload)
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

export const receiptInsertDraft = async (req, res, next) => {
    const payload = {
        userId: req.user.userId,
        productId: req.body._id,
        qty: req.body.qty
    }

    try {
        const data = await insertReceiptDraft(payload)
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

export const receiptUpdateDraft = async (req, res, next) => {
    const payload = req.body

    try {
        const data = await updateReceiptDraft(payload)
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

export const receiptConfirm = async (req, res, next) => {
    const payload = {
        userId: req.user.userId,
        _id: req.params.id
    }

    try {
        const data = await confirmReceipt(payload)
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}