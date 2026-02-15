import mongoose from "mongoose";
import StockOutModel from '../models/stockout.js'
import InventoryModel from '../models/inventory.js'
import ErrorResponse from "../utils/errorHandler.js";
import { insertStockCard } from "./stockCardService.js";

export const getStockOutDraft = async (payload) => {
    const userId = new mongoose.Types.ObjectId(payload)
    try {
        const data = await StockOutModel.aggregate([
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
                qty: '$items.qty'
            }},
            {$unset: 'items'},
        ])
        return data
    } catch (error) {
        throw new ErrorResponse(400, error)
    }
}

export const insertStockOutDraft = async (payload) => {
    const userId = payload.userId
    const item = {
        productId: payload.productId,
        qty: payload.qty
    }

    try {
        let data;
        const stockout = await StockOutModel.findOne({userId: userId, status: 'Draft'})
        if (stockout) {
            const duplicate = stockout.items.find((obj) => obj.productId == item.productId)
            if(!duplicate) {
                stockout.items.push(item)
                return await stockout.save()
            } else {
                throw new ErrorResponse(400, 'Duplicate')
            }
        } else {
            data = new StockOutModel({
                stockOutNumberNumber: 'Draft',
                userId: userId,
                items: item
            })
            return await data.save()
        }
    } catch (error) {
        throw new ErrorResponse(400, error)   
    }
}


export const updateStockOutDraft = async (payload) => {
    const _id = payload._id
    const item = {
        productId: payload.productId,
        qty: payload.qty

    }

    try {
        const data = await StockOutModel.updateOne({_id: _id, 'items.productId': item.productId}, {
            $set: {'items.$': item}
        })
        return data
    } catch (error) {
        throw new ErrorResponse(400, error)
    }
}

export const confirmStockOut = async (payload) => {
    const userId = payload.userId
    const _id = payload._id
    let newID
    const date = new Date()
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
        newID = await StockOutModel.findOne({validated: {$gte: today}}).sort({validated: -1})
         if(newID) {
            const no = newID.stockOutNumber.substring(16)
            const newNo = parseInt(no) + 1
            newID = `${dd}${mm}/ZHR/OUT/${yy}/${newNo}`
        } else {
            newID = `${dd}${mm}/ZHR/OUT/${yy}/1`
        }

        const stockout = await StockOutModel.findById(_id)
        stockout.stockOutNumber = newID
        stockout.validated = new Date()
        stockout.status = 'Validated'
        const data = await stockout.save()
        const items = data.items
        const stockcard = {
            type: '',
            productId: '',
            documentId: data._id,
            documentName: data.stockOutNumber,
            qty: '',
            balance: ''
        }

        for (let i = 0; i < items.length; i++) {
            const item = items[i]
            const lastQty = await InventoryModel.findById(item.productId).select('quantity')
            const newQty = parseInt(lastQty.quantity) - parseInt(item.qty)
            await InventoryModel.updateOne({_id: item.productId}, {quantity: newQty})

            stockcard.type = 'out'
            stockcard.productId = item.productId
            stockcard.qty = item.qty
            stockcard.balance = newQty
            await insertStockCard(stockcard)
        }
        return 'OK'
    } catch (error) {
        throw new ErrorResponse(400, error)
    }
}