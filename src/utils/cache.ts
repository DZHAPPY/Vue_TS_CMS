enum CacheType {
  Local,
  Session
}

class Cache {
  storage: Storage

  constructor(type: CacheType) {
    // this.storage = type === CacheType.Local ? localStorage : sessionStorage
    switch (type) {
      case CacheType.Local:
        this.storage = localStorage
      case CacheType.Session:
        this.storage = sessionStorage
    }
  }

  setCache(key: string, value: any) {
    if (value) {
      sessionStorage.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
      // return value
    }
  }

  removeCache(key: string) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}

export const LocalCache = new Cache(CacheType.Local)
export const SessionCache = new Cache(CacheType.Session)
