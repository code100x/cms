import { ICache } from '@/lib/cache/cache';
import { InMemoryCache } from '@/lib/cache/in-memory-cache';
import { RedisCache } from '@/lib/cache/redis-cache';

const redisUrl = process.env.REDIS_URL;

export class Cache implements ICache {
  private static instance: Cache;
  private delegate: ICache;

  private constructor() {
    if (redisUrl) {
      this.delegate = RedisCache.getInstance(redisUrl);
    } else {
      this.delegate = InMemoryCache.getInstance();
    }
  }

  static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache();
    }
    return Cache.instance;
  }

  async set(
    type: string,
    args: string[],
    value: any,
    expirySeconds: number = parseInt(process.env.CACHE_EXPIRE_S || '100', 10),
  ): Promise<void> {
    return this.delegate.set(type, args, value, expirySeconds);
  }

  async get(type: string, args: string[]): Promise<any> {
    return this.delegate.get(type, args);
  }

  async evict(type: string, args: string[]): Promise<null> {
    return this.delegate.evict(type, args);
  }
}
export const cache = Cache.getInstance();
