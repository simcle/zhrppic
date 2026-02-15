import express from 'express'
import { inventoryCreate, inventoryGetAll, inventoryUpdate } from '../controllers/inventoryController.js'
const inventoryRouter = express.Router()

inventoryRouter.post('/', inventoryCreate)
inventoryRouter.put('/', inventoryUpdate)
inventoryRouter.get('/', inventoryGetAll)
export default inventoryRouter