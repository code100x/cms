export class Cache {
  private inMemoryDb: Map<string, { value: any; expiry: number; }>;
  private static instance: Cache;

  private constructor() {
    this.inMemoryDb = new Map();
  }

  static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache();
    }
    return Cache.instance;
  }

  set(type: string, args: string[], value: any, expiryInSeconds: number = parseInt(process.env.CACHE_EXPIRE_S || '100', 10)): void {
    const currentTime = new Date().getTime();
    const expiry = currentTime + expiryInSeconds * 1000;
    this.inMemoryDb.set(`${type} ${JSON.stringify(args)}`, { value, expiry });
  }

  get(type: string, args: string[]): any | null {
    const key = `${type} ${JSON.stringify(args)}`;
    const cacheEntry = this.inMemoryDb.get(key);
    if (cacheEntry && cacheEntry.expiry > new Date().getTime()) {
        return cacheEntry.value;
    } else {
        this.inMemoryDb.delete(key);
        return null;
    }
  }

  evict(type: string, args: string[]): void {
    const key = `${type} ${JSON.stringify(args)}`;
    this.inMemoryDb.delete(key);
  }

  clearAll(): void {
    this.inMemoryDb.clear();
  }
}
