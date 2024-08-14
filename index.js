import express from 'express'
import dbConnection from './db/dbConnection.js'
import { config } from 'dotenv'
import { bootstrab } from './src/modules/index.routes.js'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import { AppError } from './src/utils/AppError.js'
import { globalError } from './src/middleware/globalError.js'
import { createOnlineOrder } from './src/modules/order/controller/order.js'
import { rateLimit } from 'express-rate-limit'
const app = express()
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});
app.use(limiter)
dbConnection()
config()
app.use(cors())
app.post('/webhook', express.raw({ type: 'application/json' }), createOnlineOrder)

app.use(express.json())
app.use('/uploads', express.static('uploads'))
bootstrab(app)
app.use('*', (req, res, next) => {
    next(new AppErronoder('url not founded', 404))
})
app.use(globalError)
const port = 3000
app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))

process.on('unhandledRejection', (err) => {
    console.log('unhandledRejection', err);
})