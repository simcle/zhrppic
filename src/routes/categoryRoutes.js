import express from 'express'
import { categoryCreate, categoryGetAll, categoryUpdate } from '../controllers/categoryController.js'
const categoryRouter = express.Router()

categoryRouter.post('/', categoryCreate)
categoryRouter.get('/', categoryGetAll)
categoryRouter.put('/', categoryUpdate)
export default categoryRouter