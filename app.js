const express = require('express')
const app = express()
const authRouter = require('./routes/auth')
const jobRouter = require('./routes/jobs')
const connectDB = require('./db/connect')
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')
require('dotenv').config()
require('express-async-errors')

app.use(express.json())

// routes
app.get('/api/v1/auth', authRouter)
app.get('/api/v1/jobs', jobRouter)

//middleware
app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

const port = process.env.PORT || 3000
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is running on port ${port}...`)
        })
    } catch (error) {
        console.log(error);
    }
}

start()