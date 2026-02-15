import express from 'express'
import { unitCreate, unitGetAll, unitUpdate } from '../controllers/unitController.js'

const unitRouter = express.Router()

unitRouter.post('/', unitCreate)
unitRouter.get('/', unitGetAll)
unitRouter.put('/', unitUpdate)

export default unitRouter