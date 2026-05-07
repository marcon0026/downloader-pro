const axios = require("axios")

exports.streamVideo = async (req, res) => {
  const { url } = req.query

  if (!url) {
    return res.status(400).send("No URL")
  }

  try {
    const response = await axios({
      method: "GET",
      url,
      responseType: "stream"
    })

    const total = response.headers["content-length"]
    let downloaded = 0

    res.setHeader("Content-Type", "video/mp4")

    response.data.on("data", chunk => {
      downloaded += chunk.length

      const progress = total
        ? (downloaded / total * 100).toFixed(2)
        : 0

      // kirim progress ke client
      res.write(`PROGRESS:${progress}\n`)
    })

    response.data.on("end", () => {
      res.end()
    })

    response.data.pipe(res)

  } catch (err) {
    res.status(500).send("Stream error")
  }
}
