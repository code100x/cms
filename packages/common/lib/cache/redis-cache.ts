import { Redis } from 'ioredis';

import { ICache } from './cache';

export class RedisCache implements ICache {
  private client: Redis;
  private static instance: RedisCache;

  constructor(redisUrl: string) {
    this.client = new Redis(redisUrl);
  }

  static getInstance(redisUrl: string): RedisCache {
    if (!this.instance) {
      this.instance = new RedisCache(redisUrl);
    }

    return this.instance;
  }

  async set(
    type: string,
    args: string[],
    value: any,
    expirySeconds: number,
  ): Promise<void> {
    const key = this.generateKey(type, args);
    if (expirySeconds) {
      await this.client.set(key, JSON.stringify(value), 'EX', expirySeconds);
    } else {
      await this.client.set(key, JSON.stringify(value));
    }
  }

  async get(type: string, args: string[]): Promise<any> {
    const key = this.generateKey(type, args);
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  async evict(type: string, args: string[]): Promise<null> {
    const key = this.generateKey(type, args);
    await this.client.del(key);
    return null;
  }

  private generateKey(type: string, args: string[]): string {
    return `${type}:${args.join(':')}`;
  }
}
