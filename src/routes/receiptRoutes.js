import express from 'express'
import { inventorySearchBySku, receiptConfirm, receiptGetDraft, receiptInsertDraft, receiptUpdateDraft } from '../controllers/receiptController.js'

const receiptRouter = express.Router()

receiptRouter.get('/sku', inventorySearchBySku)
receiptRouter.get('/draft', receiptGetDraft)
receiptRouter.post('/draft', receiptInsertDraft)
receiptRouter.put('/draft', receiptUpdateDraft)
receiptRouter.post('/draft/:id', receiptConfirm)

export default receiptRouter
