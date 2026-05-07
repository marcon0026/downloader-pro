const express = require("express")
const router = express.Router()

const { handleDownload } = require("../controllers/downloader.controller")

router.get("/", (req, res) => {
  res.json({ message: "API ready 🔥" })
})

// 🔥 satu endpoint semua sosmed
router.post("/download", handleDownload)
const { streamVideo } = require("../services/stream.service")

router.get("/stream", streamVideo)
module.exports = router
