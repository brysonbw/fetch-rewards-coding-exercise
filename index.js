const express = require('express')
const app = express()
require('dotenv').config()

app.use(express.json())


// transactions route
const transactionRouter = require('./routes/transaction')



// routes
app.use('/api/transaction', transactionRouter)











const PORT = process.env.PORT || 3007
app.listen(PORT, () => {
  console.log(`Server GOOD, running on port ${PORT}`)
})