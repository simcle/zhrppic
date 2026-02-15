import mongoose from 'mongoose'
import StockOpnameModel from '../models/stockopname.js'
import InventoryModel from '../models/inventory.js'
import ErrorResponse from '../utils/errorHandler.js'
import { insertStockCard } from './stockCardService.js'
export const getStockOpnameDraft = async (payload) => {
    const userId = new mongoose.Types.ObjectId(payload)
    try {
        const data = await StockOpnameModel.aggregate([
            {$match: {$and: [{userId: userId}, {status: 'Draft'}]}},
            {$unwind: '$items'},
            {$lookup: {
                from: 'inventories',
                localField: 'items.productId',
                foreignField: '_id',
                as: 'items.product'
            }},
            {$unwind: '$items.product'},
            {$addFields: {
                'items.sku': '$items.product.sku',
                'items.name': '$items.product.name'
            }},
            {$unset: 'items.product'},
            {$addFields: {
                productId: '$items.productId',
                sku: '$items.sku',
                name: '$items.name',
                stock: '$items.stock',
                counted: '$items.counted',
                difference: '$items.difference'
            }},
            {$unset: 'items'},
        ])
        return data
    } catch (error) {
        throw new ErrorResponse(400, error)
    }
}

export const insertStockopnameDraft = async (payload) => {
    const userId = payload.userId
    const item = {
        productId: payload.productId,
        stock: payload.stock,
        counted: payload.counted,
        difference: payload.difference
    }

    try {
        let data
        const stockopname = await StockOpnameModel.findOne({userId: userId, status: 'Draft'})
        if(stockopname) {
            const duplicate = stockopname.items.find((obj) => obj.productId == item.productId)
            if(!duplicate) {
                stockopname.items.push(item)
                return await stockopname.save()
            } else {
                throw new ErrorResponse(400, 'Duplicate')
            }
        } else {
            data = new StockOpnameModel({
                stockOpnameNumber: 'Draft',
                userId: userId,
                items: item
            }) 
            return await data.save()
        }
    } catch (error) {
        throw new ErrorResponse(400, error)
    }

}

export const updateStockOpnameDraft = async (payload) => {
    const _id = payload._id
    const item = {
        productId: payload.productId,
        stock: payload.stock,
        counted: payload.counted,
        difference: payload.difference
    }

    try {
        const data = await StockOpnameModel.updateOne({_id: _id, 'items.productId': item.productId}, {
            $set: {'items.$': item}
        })
        return data
    } catch (error) {
        throw new ErrorResponse(400, error)
    }
}

export const confirmStockOpname = async (payload) => {
    const userId = payload.userId
    const _id = payload._id
    let newID;
    const date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() +1;
    let yy = date.getFullYear().toString().substring(2);
    dd = checkTime(dd);
    mm = checkTime(mm)

    function checkTime (i) {
        if(i < 10) {
            i = `0${i}`
        }
        return i
    }
    let today = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    try {
        newID = await StockOpnameModel.findOne({validated: {$gte: today}}).sort({validated: -1})
        if(newID) {
            const no = newID.stockOpnameNumber.substring(18)
            const newNo = parseInt(no) + 1
            newID = `${dd}${mm}/ZHR/STOCK/${yy}/${newNo}`
        } else {
            newID = `${dd}${mm}/ZHR/STOCK/${yy}/1`
        }
        const stockopname = await StockOpnameModel.findById(_id)
        stockopname.stockOpnameNumber = newID
        stockopname.validated = new Date()
        stockopname.status = 'Validated'
        const data = await stockopname.save()
        const items = data.items
        const stockcard = {
            type: '',
            productId: '',
            documentId: data._id,
            documentName: data.stockOpnameNumber,
            qty: '',
            balance: ''
        }
        for(let i = 0; i < items.length; i++) {
            const item = items[i]
            await InventoryModel.updateOne({_id: item.productId}, {quantity: item.counted})
            if(item.difference < 0) {
                stockcard.type = 'out'
                stockcard.productId = item.productId
                stockcard.qty = item.difference
                stockcard.balance = item.counted
                await insertStockCard(stockcard)
            } else {
                stockcard.type = 'in'
                stockcard.productId = item.productId
                stockcard.qty = item.difference
                stockcard.balance = item.counted
                await insertStockCard(stockcard)
            }
        }

        return 'OK'
    } catch (error) {
        throw new ErrorResponse(400, error)
    }

}