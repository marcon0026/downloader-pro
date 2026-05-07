const axios = require("axios")

// delay helper
const sleep = (ms) => new Promise(res => setTimeout(res, ms))

exports.fetchWithRetry = async (apis, options = {}) => {
  const {
    retries = 2,
    timeout = 10000
  } = options

  // random order (anti kena limit API yang sama terus)
  const shuffled = apis.sort(() => Math.random() - 0.5)

  for (let i = 0; i < shuffled.length; i++) {
    const api = shuffled[i]

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`🔁 Try API ${i+1} Attempt ${attempt}`)

        const res = await axios.get(api, { timeout })

        if (res.data) {
          return res.data
        }

      } catch (err) {
        console.log(`❌ Gagal API ${i+1} Attempt ${attempt}`)

        if (attempt < retries) {
          await sleep(1000) // delay retry
        }
      }
    }
  }

  throw new Error("Semua API gagal")
}
