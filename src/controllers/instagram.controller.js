const { fetchWithRetry } = require("../utils/fetcher")

exports.downloadInstagram = async (req, res) => {
  const { url } = req.body

  if (!url) {
    return res.status(400).json({
      status: false,
      message: "URL kosong"
    })
  }

  try {
    const apis = [
      `https://api.vreden.my.id/api/igdl?url=${encodeURIComponent(url)}`,
      `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`
    ]

    const data = await fetchWithRetry(apis)

    const video =
      data.result?.url ||
      data.data?.play

    if (!video) throw new Error("No video")

    res.json({
      status: true,
      video
    })

  } catch (err) {
    console.error("IG ERROR:", err.message)

    res.status(500).json({
      status: false,
      message: "Instagram gagal (API limit / error)"
    })
  }
}
