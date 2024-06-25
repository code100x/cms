export interface ICache {
  set(
    type: string,
    args: string[],
    value: any,
    expirySeconds: number,
  ): Promise<void> | void;

  get(type: string, args: string[]): Promise<any> | any;

  evict(type: string, args: string[]): Promise<null> | null;
}
