import { insertInventory, readInventories, updateInventory } from "../services/inventoryService.js";


export const inventoryCreate = async (req, res, next) => {
    const payload = {
        sku: req.body.sku,
        name: req.body.name,
        categoryId: req.body.categoryId,
        unitId: req.body.unitId,
        purchasePrice: req.body.purchasePrice || 0,
        sellingPrice: req.body.sellingPrice || 0,
        quantity: 0,
        reoderLever: 0
    }

    try {
        const data = await insertInventory(payload)
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}
export const inventoryUpdate = async (req, res, next) => {
    const payload = {
        _id: req.body._id,
        sku: req.body.sku,
        name: req.body.name,
        categoryId: req.body.categoryId,
        unitId: req.body.unitId,
        purchasePrice: req.body.purchasePrice || 0,
        sellingPrice: req.body.sellingPrice || 0,
        quantity: 0,
        reoderLever: 0
    }
    try {
        const data = await updateInventory(payload)
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}
export const inventoryGetAll = async (req, res, next) => {
    const payload = req.query
    try {
        const data = await readInventories(payload)
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}