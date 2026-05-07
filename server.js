require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Static file (frontend)
app.use(express.static(path.join(__dirname, "public")))

// Routes
const apiRoutes = require("./src/routes/api.routes")
app.use("/api", apiRoutes)
const errorHandler = require("./src/middlewares/errorHandler")
app.use(errorHandler)

// Test route
app.get("/ping", (req, res) => {
  res.json({ message: "Server hidup 🚀" })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.url}`)
  next()
})
