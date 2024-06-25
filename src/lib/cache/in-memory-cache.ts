import { ICache } from './cache';

interface ICacheEntry {
  value: any;
  expiry: number;
}

export class InMemoryCache implements ICache {
  private inMemoryDb: Map<string, ICacheEntry>;
  private static instance: InMemoryCache;

  private constructor() {
    this.inMemoryDb = new Map<string, ICacheEntry>();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new InMemoryCache();
    }
    return this.instance;
  }

  set(
    type: string,
    args: string[],
    value: any,
    expirySeconds: number = parseInt(process.env.CACHE_EXPIRE_S || '100', 10),
  ): void {
    const key = this.generateKey(type, args);
    this.inMemoryDb.set(key, {
      value,
      expiry: new Date().getTime() + expirySeconds * 1000,
    });
  }

  get(type: string, args: string[]): any {
    const key = this.generateKey(type, args);
    const entry = this.inMemoryDb.get(key);
    if (!entry) {
      return null;
    }
    if (new Date().getTime() > entry.expiry) {
      this.inMemoryDb.delete(key);
      return null;
    }
    return entry.value;
  }

  evict(type: string, args: string[]): null {
    const key = this.generateKey(type, args);
    this.inMemoryDb.delete(key);
    return null;
  }

  private generateKey(type: string, args: string[]): string {
    return `${type}:${JSON.stringify(args)}`;
  }
}
