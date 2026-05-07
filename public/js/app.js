// 🧠 detect icon platform
function detectPlatform() {
  const url = document.getElementById("url").value
  const icon = document.getElementById("icon")

  if (url.includes("tiktok")) icon.innerText = "🎵"
  else if (url.includes("instagram")) icon.innerText = "📸"
  else if (url.includes("youtu")) icon.innerText = "▶️"
  else icon.innerText = "🌐"
}

// 🎯 main download
async function download() {
  const url = document.getElementById("url").value.trim()
  const result = document.getElementById("result")
  const preview = document.getElementById("preview")

  if (!url) {
    renderError("Masukkan link dulu")
    return
  }

  result.innerHTML = "⏳ Processing..."
  preview.innerHTML = ""

  try {
    const res = await fetch("/api/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    })

    const data = await res.json()

    if (data.status) {
      renderPreview(data)

      result.innerHTML = `
        <p class="text-sm text-green-400">🚀 Auto downloading...</p>
      `

      startDownload(data.video)
    } else {
      renderError(data.message)
    }

  } catch (err) {
    renderError("Server error")
  }
}

// 🎥 preview + thumbnail
function renderPreview(data) {
  const preview = document.getElementById("preview")

  preview.innerHTML = `
    <div class="fade">
      ${data.thumbnail ? `
        <img src="${data.thumbnail}" class="rounded-xl mb-2"/>
      ` : ""}

      <video controls class="rounded-xl w-full">
        <source src="${data.video}">
      </video>
    </div>
  `
}

// 📊 REAL download progress + auto save
function startDownload(videoUrl) {
  const progressBox = document.getElementById("progressBox")
  const progressBar = document.getElementById("progressBar")

  progressBox.classList.remove("hidden")

  const xhr = new XMLHttpRequest()
  xhr.open("GET", videoUrl, true)
  xhr.responseType = "blob"

  xhr.onprogress = function (e) {
    if (e.lengthComputable) {
      const percent = (e.loaded / e.total) * 100
      progressBar.style.width = percent + "%"
    }
  }

  xhr.onload = function () {
    const blob = xhr.response
    const url = window.URL.createObjectURL(blob)

    autoDownload(url)

    progressBar.style.width = "100%"
  }

  xhr.send()
}

// ⬇ auto save file
function autoDownload(url, filename = "video.mp4") {
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
}

// ❌ error UI
function renderError(msg) {
  const result = document.getElementById("result")

  result.innerHTML = `
    <div class="bg-red-500/20 border border-red-500 p-2 rounded text-sm">
      ❌ ${msg}
    </div>
  `
}
