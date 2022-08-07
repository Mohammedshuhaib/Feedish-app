const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db/connection')

const app = express()
const userRouter = require('./routes/userRouter')

const corsOptions = {
  origin: 'http://localhost:3000'
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', userRouter)

db.on('error', console.error.bind(console, 'Mongodb connection failed'))

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || 'Something went wrong'
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  })
})

app.listen(2000, () => {
  console.log('server running on 2000')
})
