const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const formRoutes = require('./routes/form.routes')
const responseRoutes = require('./routes/response.routes')
const errorHandler = require('./middleware/errorHandler')

const app = express()
const port = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/forms', formRoutes)
app.use('/api/responses', responseRoutes)

// Error handling
app.use(errorHandler)

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err))

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})