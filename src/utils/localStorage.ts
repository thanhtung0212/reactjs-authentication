export enum StorageKeys {
  ReduxStore = "reduxStore",
  AccessToken = "accessToken",
  RefreshToken = "refreshToken"
}

export default class Storage {
  /**
   *
   * @param key
   * @returns
   */
  public static getItem(key: StorageKeys): string {
    const value = window.localStorage.getItem(key) || "";
    return value;
  }

  /**
   *
   * @param key
   * @param value
   */
  public static setItem(key: string, value: string) {
    window.localStorage.setItem(key, value);
  }

  /**
   *
   * @param key
   */
  public static removeItem(key: string): void {
    window.localStorage.removeItem(key);
  }

  /**
   *
   * @param keys
   */
  public static removeItems(keys: string[]): void {
    for (const key of keys) Storage.removeItem(key);
  }
}
