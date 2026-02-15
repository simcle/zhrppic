import validate from "../utils/validate.js";
import inventorySchema from "../validations/inventoryValidation.js";
import InventoryModel from '../models/inventory.js'
import ErrorResponse from "../utils/errorHandler.js";

export const searchInventorySKU = async (payload) => {
    const sku = payload
    try {
        const data = await InventoryModel.findOne({sku: sku})
        return data
    } catch (error) {
        throw new ErrorResponse(400, error)
    }
}


export const insertInventory = async (payload) => {
    const inventory = await validate(inventorySchema, payload)
    try {
        const existingSKU = await InventoryModel.findOne({sku: inventory.sku})
        if(existingSKU) {
            throw new ErrorResponse(400, 'SKU sudah ada')
        }
        const data = await InventoryModel.create(inventory)
        return data
    } catch (error) {
        throw new ErrorResponse(400, error)
    }
}

export const updateInventory = async (payload) => {
    const inventory = await validate(inventorySchema, payload)
    const _id = inventory._id
    const sku = inventory.sku
    const name = inventory.name
    const categoryId = inventory.categoryId
    const unitId = inventory.unitId
    const purchasePrice = inventory.purchasePrice
    const sellingPrice = inventory.sellingPrice
    const reorderLevel = inventory.reorderLevel
    try {
        const data = await InventoryModel.updateOne({_id: _id}, 
            {
                sku: sku,
                name: name,
                categoryId: categoryId,
                unitId: unitId,
                purchasePrice: purchasePrice,
                sellingPrice: sellingPrice,
                reorderLevel: reorderLevel
            }
        )
        return data
    } catch (error) {
        if (error.code === 11000) { // MongoDB duplicate key error
            const field = Object.keys(error.keyPattern)[0]; // Ambil nama field yang menyebabkan duplicate
            throw new ErrorResponse(400, field)
          }
        throw new ErrorResponse(400, error)
    }
}

export const readInventories = async (payload) => {
    const search = payload.search
    const currentPage = payload.page || 1
    const perPage = payload.perPage || 10
    const queryString = '\"' + search.split(' ').join('\" \"') + '\"';
    let totalItems;
    let query;
    if(queryString.length > 2) {
        
        query = {$or: [{sku: search},{name: {$regex: '.*'+search+'.*', $options: 'i'}}]}
    } else {
        query = {}
    }
    try {
        totalItems = await InventoryModel.find(query).countDocuments()
        const result = await InventoryModel.aggregate([
            {$sort: {createdAt: -1}},
            {$match: query},
            {$skip: (currentPage -1) * perPage},
            {$limit: perPage},
            {$lookup: {
                from: 'categories',
                localField: 'categoryId',
                foreignField: '_id',
                as: 'category'
            }},
            {$unwind: {
                path: '$category',
                preserveNullAndEmptyArrays: true
            }},
            {$lookup: {
                from: 'units',
                localField: 'unitId',
                foreignField: '_id',
                as: 'unit'
            }},
            {$unwind: {
                path: '$unit',
                preserveNullAndEmptyArrays: true
            }},
            {$project: {
                _id: 1,
                sku: 1,
                name: 1,
                categoryId: 1,
                categoryName: '$category.name',
                unitId: 1,
                unitName: '$unit.name',
                quantity: 1,
                purchasePrice: 1,
                sellingPrice: 1,
                reorderLevel: 1
            }}
        ])
       
        const last_page = Math.ceil(totalItems / perPage)
        const data = {
            data: result,
            pages: {
                current_page: currentPage,
                last_page: last_page,
                totalItems: totalItems
            }
        }
        return data
    } catch (error) {
        throw new ErrorResponse(400, error)
    }
}