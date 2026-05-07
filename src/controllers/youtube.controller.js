const ytdl = require("ytdl-core")

exports.downloadYouTube = async (req, res) => {
  const { url } = req.body

  if (!url) {
    return res.status(400).json({
      status: false,
      message: "URL kosong"
    })
  }

  try {
    if (!ytdl.validateURL(url)) {
      return res.status(400).json({
        status: false,
        message: "Link YouTube tidak valid"
      })
    }

    const info = await ytdl.getInfo(url)

    const title = info.videoDetails.title

    // ambil format video
    const format = ytdl.chooseFormat(info.formats, {
      quality: "18" // 360p biar ringan
    })

    res.json({
      status: true,
      title: title,
      video: format.url,
      audio: info.formats.find(f => f.mimeType.includes("audio")).url
    })

  } catch (err) {
    console.error("YT ERROR:", err.message)

    res.status(500).json({
      status: false,
      message: "Gagal ambil video YouTube"
    })
  }
}
