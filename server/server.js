import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import logger from 'morgan'

//Routes
import categoryRoute from './routes/Categories.js'
import productRoute from './routes/Products.js'
import invoiceRoute from  './routes/Invoices.js'
import authRoute   from  './routes/auth.js'
import userRoute  from   './routes/users.js'

dotenv.config()

const app = express()
// PORT
const port = process.env.PORT || 5000;


// DB Connection
const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('mongo db is connected')
    } catch (error) {
        throw error
    }
}

// MidleWares
app.use(express.json())
app.use(cors())
app.use(logger("dev"))

app.use("/api/categories",categoryRoute)
app.use("/api/products",productRoute)
app.use("/api/invoices",invoiceRoute)
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)








app.get('/',(req,res) => {
    res.send("Hello Backend")
})



app.listen(port,() => {
    connect()
    console.log(`Example App Listening on ${port} Port`)
})

    