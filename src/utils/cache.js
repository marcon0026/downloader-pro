const cache = new Map()

exports.setCache = (key, data, ttl = 300000) => {
  cache.set(key, {
    data,
    expire: Date.now() + ttl
  })
}

exports.getCache = (key) => {
  const item = cache.get(key)

  if (!item) return null

  if (Date.now() > item.expire) {
    cache.delete(key)
    return null
  }

  return item.data
}
