export class Cache {
  private inMemoryDb: Map<
    string,
    {
      value: any;
      expiry: number;
    }
  >;
  private static instance: Cache;

  private constructor() {
    this.inMemoryDb = new Map<
      string,
      {
        value: any;
        expiry: number;
      }
    >();
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new Cache();
    }

    return this.instance;
  }

  set(
    type: string,
    args: string[],
    value: any,
    expiry = new Date().getTime() +
      parseInt(process.env.CACHE_EXPIRE_S || '100', 10) * 1000,
  ) {
    this.inMemoryDb.set(`${type} ${JSON.stringify(args)}`, {
      value,
      expiry,
    });
  }

  get(type: string, args: string[]) {
    const value = this.inMemoryDb.get(`${type} ${JSON.stringify(args)}`);
    if (!value) {
      return null;
    }
    if (new Date().getTime() > value.expiry) {
      this.inMemoryDb.delete(`${type} ${JSON.stringify(args)}`);
      return null;
    }
    return value.value;
  }

  evict() {}
}
