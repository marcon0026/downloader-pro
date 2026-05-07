exports.detectPlatform = (url) => {
  if (!url) return null

  if (url.includes("tiktok.com") || url.includes("vt.tiktok.com")) {
    return "tiktok"
  }

  if (url.includes("instagram.com")) {
    return "instagram"
  }

  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return "youtube"
  }

  return "unknown"
}
