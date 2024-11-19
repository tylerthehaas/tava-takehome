import express from 'express'
import cors from 'cors'
import routes from './routes'
import { globalErrorHandler } from './lib/error'

const app = express()
const port = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/', routes)

// Error handling (must be last!)
app.use(globalErrorHandler)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
