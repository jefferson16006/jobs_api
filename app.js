const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')
require('dotenv').config()
require('express-async-errors')

app.use(express.json())

//middleware
app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

app.get('/', (req, res) => {
    res.send('Home route.')
})

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