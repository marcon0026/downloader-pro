const { detectPlatform } = require("../utils/validator")

const { downloadTikTok } = require("./tiktok.controller")
const { downloadInstagram } = require("./instagram.controller")
const { downloadYouTube } = require("./youtube.controller")

exports.handleDownload = async (req, res) => {
  const { url } = req.body

  if (!url || url.trim() === "") {
    return res.status(400).json({
      status: false,
      message: "URL tidak boleh kosong"
    })
  }

  const platform = detectPlatform(url)

  console.log("📥 URL:", url)
  console.log("🔍 Platform:", platform)

  try {
    switch (platform) {
      case "tiktok":
        return await downloadTikTok(req, res)

      case "instagram":
        return await downloadInstagram(req, res)

      case "youtube":
        return await downloadYouTube(req, res)

      default:
        return res.status(400).json({
          status: false,
          message: "Platform tidak didukung"
        })
    }

  } catch (err) {
    console.error("❌ ERROR:", err.message)

    return res.status(500).json({
      status: false,
      message: "Terjadi kesalahan server"
    })
  }
}
