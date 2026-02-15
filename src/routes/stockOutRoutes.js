import express from 'express'
import { inventorySearchBySku, stockoutConfirm, stockoutGetDraft, stockoutInsertDraft, stockoutUpdateDraft } from '../controllers/stockOutController.js'
const stockOutRouter = express.Router()

stockOutRouter.get('/sku', inventorySearchBySku)
stockOutRouter.get('/draft', stockoutGetDraft)
stockOutRouter.post('/draft', stockoutInsertDraft)
stockOutRouter.put('/draft', stockoutUpdateDraft)
stockOutRouter.post('/draft/:id', stockoutConfirm)
export default stockOutRouter
