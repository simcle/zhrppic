import express from 'express'
import { inventorySearchBySku, stockopnameConfirm, stockopnameGetDraft, stockopnameInsertDraft, stockopnameUpdateDraft } from '../controllers/stockopname.js'

const stockOpnameRouter = express.Router()

stockOpnameRouter.get('/sku', inventorySearchBySku)
stockOpnameRouter.get('/draft', stockopnameGetDraft)
stockOpnameRouter.post('/draft', stockopnameInsertDraft)
stockOpnameRouter.put('/draft', stockopnameUpdateDraft)
stockOpnameRouter.post('/draft/:id', stockopnameConfirm)

export default stockOpnameRouter