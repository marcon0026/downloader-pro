const { fetchWithRetry } = require("../utils/fetcher")
const { getCache, setCache } = require("../utils/cache")

exports.downloadTikTok = async (req, res) => {
  const { url } = req.body

  if (!url) {
    return res.status(400).json({ status: false })
  }

  // 🔥 cek cache dulu
  const cached = getCache(url)
  if (cached) {
    console.log("⚡ CACHE HIT")
    return res.json({ status: true, ...cached })
  }

  try {
    const apis = [
      `https://api.tiklydown.me/api/download?url=${encodeURIComponent(url)}`,
      `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`
    ]

    const data = await fetchWithRetry(apis)

    const video = data.video?.noWatermark || data.data?.play
    const audio = data.music || data.data?.music
    const title = data.title || data.data?.title
    const thumbnail = data.cover || data.data?.cover

    const result = {
      title,
      video,
      audio,
      thumbnail
    }

    // simpan cache
    setCache(url, result)

    res.json({
      status: true,
      ...result
    })

  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Gagal ambil TikTok"
    })
  }
}
