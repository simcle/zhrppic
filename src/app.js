import express from 'express'
import corsMiddleware from './middleware/corsMiddleware.js'
import errorHandler from './middleware/errorMiddleware.js'
import authenticate from './middleware/authMiddleware.js'

// Router
import userRouter from './routes/userRoutes.js'
import categoryRouter from './routes/categoryRoutes.js'
import unitRouter from './routes/unitRoutes.js'
import inventoryRoutes from './routes/inventoryRoutes.js'
import stockOpnameRouter from './routes/stockopname.js'
import receiptRouter from './routes/receiptRoutes.js'
import stockOutRouter from './routes/stockOutRoutes.js'

const app = express()
app.use(corsMiddleware)
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/auth', userRouter)
app.use('/category', authenticate, categoryRouter)
app.use('/unit', authenticate, unitRouter)
app.use('/inventory', authenticate, inventoryRoutes)
app.use('/stock-opname', authenticate, stockOpnameRouter)
app.use('/receipt', authenticate, receiptRouter)
app.use('/stockout', authenticate, stockOutRouter)
app.use(errorHandler)

export default app