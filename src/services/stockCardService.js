import StockCardModel from '../models/stockcard.js'

export const insertStockCard = async (payload) => {
    const type = payload.type
    const data = {
        productId: payload.productId,
        documentId: payload.documentId,
        documentName: payload.documentName,
        qty: payload.qty,
        balance: payload.balance
    }
    if(type == 'in') {
        const stockcard = new StockCardModel({
            productId: data.productId,
            documentId: data.documentId,
            documentName: data.documentName,
            stockIn: data.qty,
            balance: data.balance
        })
        await stockcard.save()
    }
    if(type == 'out') {
        const stockcard = new StockCardModel({
            productId: data.productId,
            documentId: data.documentId,
            documentName: data.documentName,
            stockOut: data.qty,
            balance: data.balance
        })
        await stockcard.save()
    }
}